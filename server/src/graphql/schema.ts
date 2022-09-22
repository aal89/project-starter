import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { mutationTypeDefs, mutationResolvers } from './resolvers/mutations';
import { queryTypeDefs, queryResolvers } from './resolvers/queries';
import { statsTypeDefs, queryResolvers as statsQueries } from './resolvers/stats';
import { userTypeDefs, queryResolvers as userQueries, mutationResolvers as userMutations } from './resolvers/user';
import { scalarResolvers, scalarTypeDefs } from './scalars';

const typeDefs = mergeTypeDefs([
  scalarTypeDefs,
  queryTypeDefs,
  mutationTypeDefs,
  userTypeDefs,
  statsTypeDefs,
]);

const resolvers: Resolvers<ContextType> = {
  ...scalarResolvers,
  Query: {
    ...queryResolvers,
    ...statsQueries,
    ...userQueries,
  },
  Mutation: {
    ...mutationResolvers,
    ...userMutations,
  },
};

export { typeDefs, resolvers };
