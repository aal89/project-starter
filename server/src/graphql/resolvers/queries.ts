import { gql } from 'apollo-server-express';
import { compare } from 'bcrypt';
import { User } from '../../entities/User';
import { createToken } from '../../token';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type LoginResult {
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    login(username: String!, password: String!): LoginResult
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

    const accessToken = await createToken(user);

    return {
      accessToken,
      refreshToken: '',
    };
  },
};

export { queryTypeDefs, queryResolvers };
