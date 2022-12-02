import { ok } from 'assert';
import { Permission } from '@project-starter/shared/build';
import { gql } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { sendActivateAccountMail } from '../../email/templates/activate-account';
import { sendRequestPasswordResetMail } from '../../email/templates/request-password-reset';
import { Permission as PermissionData } from '../../entities/Permission';
import { User } from '../../entities/User';
import { translateError, DatabaseError, ValidationError } from '../../errors/translateError';
import { ContextType } from '../apollo-server';
import { compareOrReject } from '../auth/auth';
import { createTokens, validateRefreshToken } from '../auth/token';
import { MutationResolvers } from '../generated/graphql';

const authTypeDefs = gql`
  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  extend type Mutation {
    signup(username: String!, password: String!, email: String!, name: String!): Void
    login(username: String!, password: String!): Tokens!
    refresh(token: String!): Tokens!
    requestPasswordReset(email: String!): Void
    activate(username: String!, code: String!): Void
    sendActivate(email: String!): Void
  }
`;

const mutationResolvers: MutationResolvers<ContextType> = {
  requestPasswordReset: async (_, { email }, { can, log }) => {
    try {
      const user = await User.findOne({
        where: { email },
        cache: true,
      });

      ok(user, `No user found by ${email}`);
      ok(can(Permission.LOGIN, user.encodedPermissions), 'This account is locked');

      log.info(`Password reset requested for account: ${user.username}`);

      await sendRequestPasswordResetMail(user);
    } catch (err) {
      log.error((err as Error).message);

      throw err;
    }
  },
  signup: async (_, {
    username, password, email, name,
  }, { log }) => {
    try {
      const user = new User();

      user.username = username;
      user.name = name;
      user.email = email;
      await user.setPassword(password);

      await validateOrReject(user);

      await user.save();

      await sendActivateAccountMail(user);
    } catch (err) {
      log.error((err as Error).message);

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
  login: async (_, { username, password }, { can, log }) => {
    try {
      const user = await User.findOne({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      ok(user, `No user found by ${username}`);
      ok(can(Permission.LOGIN, user.encodedPermissions), 'This account is locked');

      await compareOrReject(password, user?.password ?? '');

      const { accessToken, refreshToken } = await createTokens(user);

      user.lastOnlineAt = new Date();
      await user.save();

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      log.error((err as Error).message);

      throw new Error('Incorrect password');
    }
  },
  refresh: async (_, { token }, { can, log }) => {
    try {
      const { username } = await validateRefreshToken(token);
      const user = await User.findOne({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      ok(user, `No user found by ${username}`);
      ok(can(Permission.LOGIN, user.encodedPermissions), 'This account is locked');

      // TODO: invalidate refresh token

      user.lastOnlineAt = new Date();
      await user.save();

      const { accessToken, refreshToken } = await createTokens(user);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      log.error((err as Error).message);

      throw new Error('Unknown user');
    }
  },
  activate: async (_, { code, username }, { log }) => {
    try {
      const user = await User.findOne({
        where: { username },
        cache: true,
        relations: ['permissions'],
      });

      ok(user, `No user found by ${username}`);
      ok(user.neverLoggedIn(), 'You can only activate new accounts');
      ok((await user.getOtp()) === code, 'Incorrect code');

      const canLogin = await PermissionData.find({
        where: { name: Permission.LOGIN },
      });
      user.permissions = canLogin;

      await user.save();
    } catch (err) {
      log.error((err as Error).message);

      throw err;
    }
  },
  sendActivate: async (_, { email }, { can, log }) => {
    try {
      const user = await User.findOne({
        where: { email },
        cache: true,
        relations: ['permissions'],
      });

      ok(user, `No user found by ${email}`);
      ok(user.neverLoggedIn(), 'You can only activate new accounts');
      ok(!can(Permission.LOGIN, user.encodedPermissions), 'This account is already activated');

      log.info(`Resending activation email to: ${user.username}`);

      await sendActivateAccountMail(user);
    } catch (err) {
      log.error((err as Error).message);

      throw err;
    }
  },
};

export { authTypeDefs, mutationResolvers };
