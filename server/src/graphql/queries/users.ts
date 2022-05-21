import { gql } from 'apollo-server-express';
import { User as UserData } from '../../entities/User';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
  }

  type Query {
    users: [User]!
  }
`;

const toGqlUser = (user: UserData) => ({
  ...user,
  id: String(user.id),
});

const resolvers: QueryResolvers<ContextType> = {
  users: async (root, args, { roles, permissions }, info) => {
    const users = await UserData.find();
    return users.map(toGqlUser);
  },
};

export { typeDefs, resolvers };
