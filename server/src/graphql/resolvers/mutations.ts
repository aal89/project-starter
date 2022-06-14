import { gql } from 'apollo-server-express';
import { compare, hash } from 'bcrypt';
import { validateOrReject } from 'class-validator';
import { User } from '../../entities/User';
import { DatabaseError, translateError, ValidationError } from '../../errors/translateError';
import { createTokens, validateRefreshToken } from '../../token';
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
    refreshToken(token: String!): Tokens!
  }
`;

const mutationResolvers: MutationResolvers = {
  signup: async (_, { username, password, name }) => {
    try {
      const user = new User();

      user.username = username;
      user.password = await hash(password, 12);
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
  login: async (_, { username, password }) => {
    const user = await User.findOneBy({ username });

    if (!user) {
      throw new Error('Unknown user');
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new Error('Incorrect password');
    }

    const { accessToken, refreshToken } = await createTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  },
  refreshToken: async (_, { token }) => {
    const { id } = await validateRefreshToken(token);

    const user = await User.findOneBy({ id });

    if (!user) {
      throw new Error('Unknown user');
    }

    const { accessToken, refreshToken } = await createTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  },
};

export { mutationTypeDefs, mutationResolvers };
