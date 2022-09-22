import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server-express';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { authTypeDefs, mutationResolvers as authMutations } from './resolvers/auth';
import { statsTypeDefs, queryResolvers as statsQueries } from './resolvers/stats';
import { userTypeDefs, queryResolvers as userQueries, mutationResolvers as userMutations } from './resolvers/user';
import { scalarResolvers, scalarTypeDefs } from './scalars';

const typeDefs = mergeTypeDefs([
  gql`
    type Query
    type Mutation
  `,
  scalarTypeDefs,
  authTypeDefs,
  userTypeDefs,
  statsTypeDefs,
]);

const resolvers: Resolvers<ContextType> = {
  ...scalarResolvers,
  Query: {
    ...statsQueries,
    ...userQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
  },
};

export { typeDefs, resolvers };
