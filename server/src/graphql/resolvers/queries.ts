import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { User } from '../../entities/User';
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
    user(id: String!): User
    users(offset: Int!, limit: Int!): [User!]!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
  users: async (_, { offset, limit }, { userCan }) => {
    ok(userCan(Permission.ADMINISTRATE), 'User is not allowed to list users');

    const pageSize = Math.max(1, Math.min(limit, 25));
    const pageOffset = Math.max(0, offset);

    return User.find({ skip: pageOffset, take: pageSize });
  },
};

export { queryTypeDefs, queryResolvers };
