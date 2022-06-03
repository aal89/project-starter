import { gql } from 'apollo-server-express';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  type Mutation {
    signup(email: String!, password: String!, name: String!): Boolean!
    login(email: String!, password: String!): String!
  }
`;

const mutationResolvers: MutationResolvers = {
  signup: async (root, args) => true,
  login: async (root, args) => 'logged_in',
};

export { mutationTypeDefs, mutationResolvers };
