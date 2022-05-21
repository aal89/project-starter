import { mergeTypeDefs } from '@graphql-tools/merge';
import { ContextType } from './apollo-server';
import { Resolvers } from './generated/graphql';
import { typeDefs as userTypes, resolvers as userResolvers } from './queries/users';

const typeDefs = mergeTypeDefs([userTypes]);

const resolvers: Resolvers<ContextType> = {
  Query: {
    ...userResolvers,
  },
};

export { typeDefs, resolvers };
