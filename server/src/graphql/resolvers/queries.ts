import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { Like, MoreThan } from 'typeorm';
import { User } from '../../entities/User';
import { midnight, firstDayOfMonth } from '../../utils/date';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type User {
    id: String!
    username: String!
    name: String!
    lastName: String
    image: String
    email: String!
    encodedPermissions: String!
    lastOnlineAt: Date!
    createdAt: Date!
  }

  type PaginatedUsers {
    total: Int!
    users: [User!]!
  }

  type Query {
    users(username: String, offset: Int!, limit: Int!): PaginatedUsers!
    totalUsers: Int!
    activeUsers: Int!
    recentlyCreatedUsers: Int!
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
  totalUsers: async (_, __, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to retrieve stats');

    return User.count();
  },
  activeUsers: async (_, __, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to retrieve stats');

    return User.count({
      where: {
        lastOnlineAt: MoreThan(firstDayOfMonth()),
      },
    });
  },
  recentlyCreatedUsers: async (_, __, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), 'User is not allowed to retrieve stats');

    return User.count({
      where: {
        createdAt: MoreThan(midnight()),
      },
    });
  },
};

export { queryTypeDefs, queryResolvers };
