import { ok } from 'assert';
import { Permission } from '@project-starter/shared/build';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import { translateError, DatabaseError, ValidationError } from '../../errors/translateError';
import { randomString } from '../../utils/string';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { createTokens, validateRefreshToken } from '../auth/token';
import { MutationResolvers } from '../generated/graphql';

const authTypeDefs = gql`
  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  extend type Mutation {
    signup(username: String!, password: String!, email: String!, name: String!): Void
    login(username: String!, password: String!): Tokens!
    refresh(token: String!): Tokens!
    resetPassword(id: String!): String!
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
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
      console.log(username, password);
      const user = await User.findOneOrFail({
        where: { username },
        relations: ['permissions'],
      });
      console.log(user);
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

export { authTypeDefs, mutationResolvers };
