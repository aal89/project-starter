import { ok } from 'assert';
import { decode, Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { In } from 'typeorm';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import { DatabaseError, translateError, ValidationError } from '../../errors/translateError';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { createTokens, validateRefreshToken } from '../auth/token';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  scalar Void

  input UserInput {
    username: String!
    name: String
    lastName: String
    permissions: String
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
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
  editUser: async (_, {
    user: {
      username, name, lastName, permissions,
    },
  }, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to edit users');

    const user = await User.findOneOrFail({ where: { username }, relations: ['permissions'] });

    const updatedPermissions = permissions ?? user.encodedPermissions;
    const decodedPermissions = await PermissionData.find({
      where: { name: In(decode(updatedPermissions)) },
    });

    user.name = name ?? user.name;
    user.lastName = lastName ?? user.lastName;
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
