import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { MoreThan } from 'typeorm';
import { User } from '../../entities/User';
import { firstDayOfMonth, midnight } from '../../utils/date';
import { ContextType } from '../apollo-server';
import { StatsResolvers } from '../generated/graphql';

const statsTypeDefs = gql`
  type Stats {
    totalUsers: Int!
    activeUsers: Int!
    recentlyCreatedUsers: Int!
  }

  extend type Query {
    stats: Stats!
  }
`;

const statsResolvers: StatsResolvers<ContextType> = {
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

export { statsTypeDefs, statsResolvers };
