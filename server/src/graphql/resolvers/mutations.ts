import { ok } from 'assert';
import { decode, Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { In } from 'typeorm';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import { DatabaseError, translateError, ValidationError } from '../../errors/translateError';
import { randomString } from '../../utils/string';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { createTokens, validateRefreshToken } from '../auth/token';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  input UserInput {
    oldUsername: String
    username: String
    name: String!
    email: String
    lastName: String
    image: String
    permissions: String
  }

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!, email: String!, name: String!): Void
    login(username: String!, password: String!): Tokens!
    refresh(token: String!): Tokens!
    editUser(user: UserInput!): User!
    changePassword(oldPassword: String!, newPassword: String!): Void
    resetPassword(id: String!): String!
    deleteAccount(id: String!): Void
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
  deleteAccount: async (_, { id }, { userCan, user }) => {
    ok(
      userCan(Permission.LOGIN, Permission.ADMINISTRATE),
      'User is not allowed to delete accounts',
    );

    if (user?.id === id) {
      throw new Error('Cannot delete your own account');
    }

    await User.delete(id);
  },
  resetPassword: async (_, { id }, { userCan }) => {
    ok(
      userCan(Permission.LOGIN, Permission.ADMINISTRATE),
      'User is not allowed to reset passwords',
    );

    const user = await User.findOneOrFail({ where: { id } });
    const newPassword = randomString();
    await user.setPassword(newPassword);
    await user.save();

    return newPassword;
  },
  changePassword: async (_, { oldPassword, newPassword }, { user: contextUser, userCan }) => {
    ok(userCan(Permission.LOGIN), 'User is not allowed to login');
    ok(oldPassword !== newPassword, 'New password cannot be the same as your old password');
    ok(contextUser, 'Missing context');

    const user = await User.findOneOrFail({
      where: { username: contextUser.username },
    });

    await compareOrReject(oldPassword, user.password);
    await user.setPassword(newPassword);
    await user.save();
  },
  editUser: async (
    _,
    {
      user: {
        oldUsername, username, name, email, lastName, permissions, image,
      },
    },
    { user: contextUser, userCan },
  ) => {
    ok(userCan(Permission.LOGIN), 'User is not allowed to login');
    ok(contextUser);

    const isAdmin = userCan(Permission.ADMINISTRATE);

    const whereUsername = isAdmin && oldUsername ? oldUsername : contextUser.username;

    try {
      const user = await User.findOneOrFail({
        where: { username: whereUsername },
        relations: ['permissions'],
      });

      if (isAdmin) {
        user.username = username ?? user.username;
        user.email = email ?? user.email;
      }

      if (isAdmin && permissions) {
        const decodedPermissions = await PermissionData.find({
          where: { name: In(decode(permissions)) },
        });

        user.permissions = decodedPermissions;
      }

      user.name = name;
      user.lastName = lastName ?? undefined;
      user.image = image ?? undefined;

      await validateOrReject(user);

      await user.save();

      return user;
    } catch (err) {
      const translatedError = translateError(err);
      if (translatedError === DatabaseError.DuplicateUsername) {
        throw new Error('This username is already taken, please pick another');
      }

      if (translatedError === DatabaseError.DuplicateEmail) {
        throw new Error('This email address is already taken, please pick another');
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new Error('Username needs to be at least 4 characters');
      }

      throw new Error('Something went wrong, please try again');
    }
  },
  signup: async (_, {
    username, password, email, name,
  }) => {
    try {
      const user = new User();

      user.username = username;
      user.name = name;
      user.email = email;
      await user.setPassword(password);

      await validateOrReject(user);

      const canLogin = await PermissionData.find({
        where: { name: Permission.LOGIN },
      });

      user.permissions = canLogin;

      await user.save();
    } catch (err) {
      const translatedError = translateError(err);
      if (translatedError === DatabaseError.DuplicateUsername) {
        throw new Error('This username is already taken, please pick another');
      }

      if (translatedError === DatabaseError.DuplicateEmail) {
        throw new Error('This email address is already taken, please pick another');
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new Error('Username needs to be at least 4 characters');
      }

      throw new Error('Something went wrong, please try again');
    }
  },
  login: async (_, { username, password }, { can }) => {
    try {
      const user = await User.findOneOrFail({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });
      await compareOrReject(password, user?.password ?? '');

      if (!can(Permission.LOGIN, user.encodedPermissions)) {
        throw new Error('User is not allowed to login');
      }

      const { accessToken, refreshToken } = await createTokens(user);

      user.lastOnlineAt = new Date();
      await user.save();

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new Error('Incorrect password');
    }
  },
  refresh: async (_, { token }, { can }) => {
    try {
      const { username } = await validateRefreshToken(token);
      const user = await User.findOneOrFail({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      if (!can(Permission.LOGIN, user.encodedPermissions)) {
        throw new Error('User is not allowed to login');
      }

      // TODO: invalidate refresh token

      user.lastOnlineAt = new Date();
      await user.save();

      const { accessToken, refreshToken } = await createTokens(user);

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new Error('Unknown user');
    }
  },
};

export { mutationTypeDefs, mutationResolvers };
