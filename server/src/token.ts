import { promisify } from 'util';
import jwt, {
  Secret, VerifyOptions, Algorithm,
} from 'jsonwebtoken';
import { User } from './entities/User';
import { env } from './env';

export type ClientUser = Omit<User, 'password'>;

export type DecodedAccessToken = {
  user: ClientUser;
};

export type DecodedRefreshToken = {
  id: string;
};

export const createTokens = async (user: ClientUser) => {
  const sign = promisify<object, jwt.Secret, jwt.SignOptions, string>(jwt.sign);
  return {
    accessToken: await sign(
      {
        user,
      },
      env.signAccessTokenSecret(),
      { expiresIn: '1h' },
    ),
    refreshToken: await sign(
      {
        id: user.id,
      },
      env.signRefreshTokenSecret(),
      { expiresIn: '2w' },
    ),
  };
};

export const validateAccessToken = (token: string) => {
  return validateToken<DecodedAccessToken>(token, env.signAccessTokenSecret());
};

export const validateRefreshToken = (token: string) => {
  return validateToken<DecodedRefreshToken>(token, env.signRefreshTokenSecret());
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
