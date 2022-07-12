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

  type PaginatedUsers {
    total: Int!
    users: [User!]!
  }

  type Query {
    user(id: String!): User
    users(offset: Int!, limit: Int!): PaginatedUsers!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
  users: async (_, { offset, limit }, { userCan }) => {
    ok(userCan(Permission.ADMINISTRATE), 'User is not allowed to list users');

    const pageSize = Math.max(1, Math.min(limit, 25));
    const pageOffset = Math.max(0, offset);

    const [users, total] = await User.findAndCount({ skip: pageOffset, take: pageSize, relations: ['roles.permissions'] });

    return {
      total,
      users,
    };
  },
};

export { queryTypeDefs, queryResolvers };
