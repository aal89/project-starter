import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { typeDefs as listingTypes, resolvers as listingResolvers } from './queries/listings';
import { types } from './types';

const typeDefs = mergeTypeDefs([types, listingTypes]);

const resolvers: Resolvers<ContextType> = {
  Query: {
    ...listingResolvers,
  },
};

export { typeDefs, resolvers };
