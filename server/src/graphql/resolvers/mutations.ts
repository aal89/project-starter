import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { User } from '../../entities/User';
import { DatabaseError, translateError, ValidationError } from '../../errors/translateError';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { createTokens, validateRefreshToken } from '../auth/token';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  scalar Void

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!, name: String!): Void
    login(username: String!, password: String!): Tokens!
    refresh(token: String!): Tokens!
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
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
      relations: ['roles.permissions'],
    });
    await compareOrReject(password, user?.password ?? '');

    if (!can(Permission.LOGIN, user.permissions)) {
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
        relations: ['roles.permissions'],
      });

      if (!can(Permission.LOGIN, user.permissions)) {
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
