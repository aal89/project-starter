import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { mutationTypeDefs, mutationResolvers } from './resolvers/mutations';
import { queryTypeDefs, queryResolvers } from './resolvers/queries';
import { scalarResolvers, scalarTypeDefs } from './scalars';

const typeDefs = mergeTypeDefs([scalarTypeDefs, queryTypeDefs, mutationTypeDefs]);

const resolvers: Resolvers<ContextType> = {
  ...scalarResolvers,
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};

export { typeDefs, resolvers };
