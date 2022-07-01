import { gql } from 'apollo-server-express';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type User {
    id: String!
    username: String!
    name: String!
    lastName: String
    permissions: String!
  }

  type Query {
    users: [User!]!
  }
`;
const queryResolvers: QueryResolvers<ContextType> = {
  users: async () => {
    return [];
  },
};

export { queryTypeDefs, queryResolvers };
