import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { mutationTypeDefs, mutationResolvers } from './resolvers/mutations';
import { queryTypeDefs, queryResolvers } from './resolvers/queries';

const typeDefs = mergeTypeDefs([queryTypeDefs, mutationTypeDefs]);

const resolvers: Resolvers<ContextType> = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};

export { typeDefs, resolvers };
