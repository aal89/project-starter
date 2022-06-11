import { gql } from 'apollo-server-express';
import { compare } from 'bcrypt';
import { User } from '../../entities/User';
import { createTokens, validateRefreshToken } from '../../token';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    login(username: String!, password: String!): Tokens!
    refreshToken(token: String!): Tokens!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
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

export { queryTypeDefs, queryResolvers };
