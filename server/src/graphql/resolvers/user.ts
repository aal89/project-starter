import { ok } from 'assert';
import { decode, Permission } from '@project-starter/shared/build';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { In, Like } from 'typeorm';
import { getS3UploadUrl, s3DeleteObject } from '../../aws';
import { sendResetPasswordMail } from '../../email/templates/reset-password';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import { translateError, DatabaseError, ValidationError } from '../../errors/translateError';
import { log } from '../../logger/log';
import { randomFilename, randomString } from '../../utils/string';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { MutationResolvers, QueryResolvers } from '../generated/graphql';

const userTypeDefs = gql`
  input UserModelInput {
    oldUsername: String
    username: String
    name: String!
    email: String
    lastName: String
    image: String
    permissions: String
  }

  type UserModel {
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

  type ImageUploadParameters {
    url: String!
    filename: String!
  }

  type PaginatedUsers {
    total: Int!
    users: [UserModel!]!
  }

  extend type Query {
    me: UserModel!
    users(username: String, offset: Int!, limit: Int!): PaginatedUsers!
    getImageUploadUrl(contentType: String!): ImageUploadParameters!
  }

  extend type Mutation {
    edit(user: UserModelInput!): UserModel!
    resetPassword(id: String!): String!
    changePassword(oldPassword: String!, newPassword: String!): Void
    changePasswordByCode(username: String!, code: String!, newPassword: String!): Void
    deleteAccount(id: String!): Void
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

const mutationResolvers: MutationResolvers<ContextType> = {
  resetPassword: async (_, { id }, { userCan }) => {
    ok(
      userCan(Permission.LOGIN, Permission.ADMINISTRATE),
      'User is not allowed to reset passwords',
    );

    const user = await User.findOneOrFail({ where: { id } });
    const newPassword = randomString();
    await user.setPassword(newPassword);
    await user.save();

    await sendResetPasswordMail(user.name, user.email, newPassword);

    return newPassword;
  },
  deleteAccount: async (_, { id }, { userCan, user }) => {
    ok(
      userCan(Permission.LOGIN, Permission.ADMINISTRATE),
      'User is not allowed to delete accounts',
    );

    if (user?.id === id) {
      throw new Error('Cannot delete your own account');
    }

    await User.delete(id);
  },
  changePassword: async (_, { oldPassword, newPassword }, { user: contextUser, userCan }) => {
    ok(userCan(Permission.LOGIN), 'User is not allowed to login');
    ok(oldPassword !== newPassword, 'New password cannot be the same as your old password');
    ok(contextUser, 'Missing context');

    const user = await User.findOneOrFail({
      where: { username: contextUser.username },
    });

    await compareOrReject(oldPassword, user.password);
    await user.setPassword(newPassword);
    await user.save();
  },
  changePasswordByCode: async (_, { username, code, newPassword }, { can }) => {
    try {
      const user = await User.findOneOrFail({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      const userOtp = await user.getPasswordOtp();

      ok(can(Permission.LOGIN, user.encodedPermissions), 'This account is locked');
      ok(userOtp === code, 'Incorrect code');

      await user.setPassword(newPassword);
      await user.save();
    } catch (err) {
      log.error(err);

      throw err;
    }
  },
  edit: async (
    _,
    {
      user: {
        oldUsername, username, name, email, lastName, permissions, image,
      },
    },
    { user: contextUser, userCan, logger },
  ) => {
    ok(userCan(Permission.LOGIN), 'User is not allowed to login');
    ok(contextUser);

    const isAdmin = userCan(Permission.ADMINISTRATE);

    const whereUsername = isAdmin && oldUsername ? oldUsername : contextUser.username;

    try {
      const user = await User.findOneOrFail({
        where: { username: whereUsername },
        relations: ['permissions'],
      });

      if (isAdmin) {
        user.username = username ?? user.username;
        user.email = email ?? user.email;
      }

      if (isAdmin && permissions) {
        const decodedPermissions = await PermissionData.find({
          where: { name: In(decode(permissions)) },
        });

        user.permissions = decodedPermissions;
      }

      user.name = name;
      user.lastName = lastName ?? null;

      const { oldImage, changedImage } = user.setImage(image ?? null);

      if (changedImage && oldImage) {
        await s3DeleteObject(oldImage);
      }

      await validateOrReject(user);

      await user.save();

      return user;
    } catch (err) {
      logger.error((err as Error).message);

      const translatedError = translateError(err);
      if (translatedError === DatabaseError.DuplicateUsername) {
        throw new Error('This username is already taken, please pick another');
      }

      if (translatedError === DatabaseError.DuplicateEmail) {
        throw new Error('This email address is already taken, please pick another');
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new Error('Username needs to be at least 4 characters');
      }

      throw new Error('Something went wrong, please try again');
    }
  },
};

export { userTypeDefs, queryResolvers, mutationResolvers };
