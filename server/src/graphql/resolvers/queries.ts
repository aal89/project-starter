import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { Like } from 'typeorm';
import { getS3UploadUrl } from '../../aws';
import { User } from '../../entities/User';
import { randomFilename } from '../../utils/string';
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

  type ImageUploadParameters {
    url: String!
    filename: String!
  }

  type Query {
    me: User!
    users(username: String, offset: Int!, limit: Int!): PaginatedUsers!
    getImageUploadUrl(contentType: String!): ImageUploadParameters!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
  me: (_, __, { user, userCan }) => {
    ok(userCan(Permission.LOGIN), 'User is not allowed to retrieve itself');
    ok(user);

    return User.findOneOrFail({ where: { id: user.id }, relations: ['permissions'] });
  },
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
  getImageUploadUrl: async (_, { contentType }, { userCan }) => {
    ok(userCan(Permission.LOGIN));
    ok(
      ['image/jpeg', 'image/bmp', 'image/png'].includes(contentType),
      'Unsupported image type, try another',
    );

    const filename = randomFilename('jpg');
    const url = await getS3UploadUrl(filename, contentType);

    return {
      url,
      filename,
    };
  },
};

export { queryTypeDefs, queryResolvers };
