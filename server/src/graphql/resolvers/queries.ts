import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { Like } from 'typeorm';
import { User } from '../../entities/User';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type User {
    id: String!
    username: String!
    name: String!
    lastName: String
    encodedPermissions: String!
  }

  type PaginatedUsers {
    total: Int!
    users: [User!]!
  }

  type Query {
    user(id: String!): User
    users(username: String, offset: Int!, limit: Int!): PaginatedUsers!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
  users: async (_, { username, offset, limit }, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to list users');

    const pageSize = Math.max(1, Math.min(limit, 25));
    const pageOffset = Math.max(0, offset);

    // dont cache query, there aren't many admins anyway, let them see latest data
    const [users, total] = await User.findAndCount({
      ...(username ? { where: { username: Like(`%${username}%`) } } : {}),
      skip: pageOffset,
      take: pageSize,
      relations: ['permissions'],
    });

    return {
      total,
      users,
    };
  },
};

export { queryTypeDefs, queryResolvers };
