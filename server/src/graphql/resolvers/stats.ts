import { ok } from 'assert';
import { Permission } from '@project-starter/shared/build';
import { gql } from 'apollo-server-express';
import { MoreThan } from 'typeorm';
import { User } from '../../entities/User';
import { firstDayOfMonth, midnight } from '../../utils/date';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const statsTypeDefs = gql`
  extend type Query {
    totalUsers: Int!
    activeUsers: Int!
    recentlyCreatedUsers: Int!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
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

export { statsTypeDefs, queryResolvers };
