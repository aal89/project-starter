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
  scalar Void

  input UserInput {
    oldUsername: String!
    username: String!
    name: String!
    lastName: String
    image: String
    permissions: String!
  }

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!, name: String!): Void
    login(username: String!, password: String!): Tokens!
    refresh(token: String!): Tokens!
    editUser(user: UserInput!): User!
    resetPassword(id: String!): String!
    deleteAccount(id: String!): Void
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
  deleteAccount: async (_, { id }, { userCan, user }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to delete accounts');

    if (user?.id === id) {
      throw new Error('Cannot delete your own account');
    }

    await User.delete(id);
  },
  resetPassword: async (_, { id }, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to reset passwords');

    const user = await User.findOneOrFail({ where: { id } });
    const newPassword = randomString();
    await user.setPassword(newPassword);
    await user.save();

    return newPassword;
  },
  editUser: async (_, {
    user: {
      oldUsername, username, name, lastName, permissions, image,
    },
  }, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to edit users');

    const user = await User.findOneOrFail({ where: { username: oldUsername }, relations: ['permissions'] });
    const decodedPermissions = await PermissionData.find({
      where: { name: In(decode(permissions)) },
    });

    user.name = name;
    user.lastName = lastName ?? user.lastName;
    user.username = username;
    user.image = image ?? user.image;
    user.permissions = decodedPermissions;

    await validateOrReject(user);

    await user.save();

    return user;
  },
  signup: async (_, { username, password, name }) => {
    try {
      const user = new User();

      user.username = username;
      await user.setPassword(password);
      user.name = name;

      await validateOrReject(user);

      await user.save();
    } catch (err) {
      const translatedError = translateError(err);
      if (translatedError === DatabaseError.Duplicate) {
        throw new Error('This username is already taken, please pick another');
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new Error('Username needs to be at least 4 characters');
      }

      throw new Error('Something went wrong, please try again');
    }
  },
  login: async (_, { username, password }, { can }) => {
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

    return {
      accessToken,
      refreshToken,
    };
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
