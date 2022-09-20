import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { mutationTypeDefs, mutationResolvers } from './resolvers/mutations';
import { queryTypeDefs, queryResolvers } from './resolvers/queries';
import { statsResolvers, statsTypeDefs } from './resolvers/stats';
import { scalarResolvers, scalarTypeDefs } from './scalars';

const typeDefs = mergeTypeDefs([scalarTypeDefs, queryTypeDefs, mutationTypeDefs, statsTypeDefs]);

const resolvers: Resolvers<ContextType> = {
  ...scalarResolvers,
  Query: {
    ...queryResolvers,
  },
  Stats: {
    ...statsResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};

export { typeDefs, resolvers };
