import { ok } from 'assert';
import { decode, Permission } from '@project-starter/shared/build';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { In, Like } from 'typeorm';
import { getS3UploadUrl, s3DeleteObject } from '../../aws';
import { sendResetPasswordMail } from '../../email/templates/reset-password';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import {
  DeleteOwnAccountError,
  EmailAddressTakenError,
  IncorrectOTPError,
  NotAllowedDeleteAccountError,
  NotAllowedListUsersError,
  NotAllowedResetPasswordError,
  PasswordConstraintError,
  SomethingWentWrong,
  UnsupportedImageTypeError,
  UserLockedError,
  UsernameLengthError,
  UsernameTakenError,
  UserNotFoundError,
} from '../../errors';
import { translateError, DatabaseError, ValidationError } from '../../errors/translateError';
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
  me: async (_, __, { user, userCan, log }) => {
    try {
      ok(user);
      ok(userCan(Permission.LOGIN), new UserLockedError(user.username));

      const latestUser = await User.findOne({ where: { id: user.id }, relations: ['permissions'] });

      ok(latestUser, new UserNotFoundError(user.id));

      return latestUser;
    } catch (err) {
      log.error((err as Error).toString());

      throw err;
    }
  },
  users: async (_, { username, offset, limit }, { userCan }) => {
    ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), new NotAllowedListUsersError());

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
  getImageUploadUrl: async (_, { contentType }, { userCan, user, log }) => {
    ok(user);
    ok(userCan(Permission.LOGIN), new UserLockedError(user.username));
    ok(
      ['image/jpeg', 'image/bmp', 'image/png'].includes(contentType),
      new UnsupportedImageTypeError(),
    );

    const filename = randomFilename('jpg');
    const url = await getS3UploadUrl(filename, contentType);

    log.info(`Created a S3 upload url (${url})`);

    return {
      url,
      filename,
    };
  },
};

const mutationResolvers: MutationResolvers<ContextType> = {
  resetPassword: async (_, { id }, { userCan, log }) => {
    try {
      ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), new NotAllowedResetPasswordError());

      const user = await User.findOne({ where: { id } });

      ok(user, new UserNotFoundError(id));

      const newPassword = randomString();
      await user.setPassword(newPassword);
      await user.save();

      await sendResetPasswordMail(user, newPassword);

      log.info(`Password resetted by admin for account: ${user.username}`);

      return newPassword;
    } catch (err) {
      log.error((err as Error).toString());

      throw err;
    }
  },
  deleteAccount: async (_, { id }, { userCan, user, log }) => {
    try {
      ok(userCan(Permission.LOGIN, Permission.ADMINISTRATE), new NotAllowedDeleteAccountError());
      ok(user?.id !== id, new DeleteOwnAccountError());

      log.info(`Deleting account: ${id}`);

      await User.delete(id);
    } catch (err) {
      log.error((err as Error).toString());

      throw err;
    }
  },
  changePassword: async (_, { oldPassword, newPassword }, { user: contextUser, userCan, log }) => {
    ok(contextUser);
    ok(userCan(Permission.LOGIN), new UserLockedError(contextUser.username));
    ok(oldPassword !== newPassword, new PasswordConstraintError());

    const user = await User.findOne({
      where: { username: contextUser.username },
    });

    ok(user, new UserNotFoundError(contextUser.username));

    await compareOrReject(oldPassword, user.password);
    await user.setPassword(newPassword);
    await user.save();

    log.info(`User ${contextUser.username} changed it's password by email`);
  },
  changePasswordByCode: async (_, { username, code, newPassword }, { can, log }) => {
    try {
      const user = await User.findOne({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      ok(user, new UserNotFoundError(username));

      const userOtp = await user.getPasswordOtp();

      ok(can(Permission.LOGIN, user.encodedPermissions), new UserLockedError(username));
      ok(userOtp === code, new IncorrectOTPError());

      await user.setPassword(newPassword);
      await user.save();

      log.info(`User ${username} changed it's password by code`);
    } catch (err) {
      log.error((err as Error).toString());

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
    { user: contextUser, userCan, log },
  ) => {
    ok(contextUser);
    ok(userCan(Permission.LOGIN), new UserLockedError(contextUser.username));

    const isAdmin = userCan(Permission.ADMINISTRATE);

    const whereUsername = isAdmin && oldUsername ? oldUsername : contextUser.username;

    try {
      const user = await User.findOne({
        where: { username: whereUsername },
        relations: ['permissions'],
      });
      ok(user, new UserNotFoundError(whereUsername));

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
      log.error((err as Error).toString());

      const translatedError = translateError(err);
      if (translatedError === DatabaseError.DuplicateUsername) {
        throw new UsernameTakenError();
      }

      if (translatedError === DatabaseError.DuplicateEmail) {
        throw new EmailAddressTakenError();
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new UsernameLengthError();
      }

      throw new SomethingWentWrong();
    }
  },
};

export { userTypeDefs, queryResolvers, mutationResolvers };
