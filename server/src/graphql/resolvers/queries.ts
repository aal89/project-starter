import { gql } from 'apollo-server-express';
import { User as UserData } from '../../entities/User';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    lastName: String
    name: String!
  }

  type Query {
    users: [User]!
  }
`;

const toGqlUser = (user: UserData) => ({
  ...user,
  id: String(user.id),
});

const queryResolvers: QueryResolvers<ContextType> = {
  users: async (root, args, { roles, permissions }, info) => {
    const users = await UserData.find();
    return users.map(toGqlUser);
  },
};

export { queryTypeDefs, queryResolvers };
