import { promisify } from 'util';
import jwt, { Secret, VerifyOptions, Algorithm } from 'jsonwebtoken';
import { User } from '../../entities/User';
import { env } from '../../env';

enum TokenType {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export type DataUser = Omit<User, 'password' | 'roles'>;

export type DecodedAccessToken = {
  type: TokenType.AccessToken;
  user: DataUser;
};

export type DecodedRefreshToken = {
  type: TokenType.RefreshToken;
  username: string;
};

export const createTokens = async (user: DataUser) => {
  const sign = promisify<object, jwt.Secret, jwt.SignOptions, string>(jwt.sign);
  return {
    accessToken: await sign(
      {
        type: TokenType.AccessToken,
        user,
      } as DecodedAccessToken,
      env.signAccessTokenSecret(),
      { expiresIn: '15s' },
    ),
    refreshToken: await sign(
      {
        type: TokenType.RefreshToken,
        username: user.username,
      } as DecodedRefreshToken,
      env.signRefreshTokenSecret(),
      { expiresIn: '1w' },
    ),
  };
};

export const validateAccessToken = async (token: string) => {
  const decodedToken = await validateToken<DecodedAccessToken>(token, env.signAccessTokenSecret());

  if (decodedToken.type !== TokenType.AccessToken) {
    throw new Error('Not an accessToken');
  }

  return decodedToken;
};

export const validateRefreshToken = async (token: string) => {
  const decodedToken = await validateToken<DecodedRefreshToken>(
    token,
    env.signRefreshTokenSecret(),
  );

  if (decodedToken.type !== TokenType.RefreshToken) {
    throw new Error('Not a refreshToken');
  }

  return decodedToken;
};

const validateToken = async <T>(token: string, secret: string): Promise<T> => {
  if (!token || token.split('.').length !== 3) {
    throw new Error('Missing or invalid token');
  }

  const alg: Algorithm = 'HS256';
  const verify = promisify<string, Secret, VerifyOptions, T>(jwt.verify);
  const jwtOptions = {
    algorithms: [alg],
  };

  return verify(token, secret, jwtOptions);
};
