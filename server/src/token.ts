import { promisify } from 'util';
import jwt, {
  Secret, sign, VerifyOptions, Algorithm,
} from 'jsonwebtoken';
import { env } from './env';
import { User } from './graphql/generated/graphql';

export type DecodedToken = {
  user: User;
  permissions: Array<string>;
  roles: Array<string>;
};

export const createToken = async (user: User) => sign(
  {
    user,
    permissions: [],
    roles: [],
  },
  env.signSecret(),
  { expiresIn: '1y' },
);

export const validateToken = async (token: string): Promise<DecodedToken> => {
  if (!token || token.split('.').length !== 3) {
    throw new Error('Missing or invalid token');
  }

  const alg: Algorithm = 'HS256';
  const verify = promisify<string, Secret, VerifyOptions, DecodedToken>(jwt.verify);
  const jwtOptions = {
    algorithms: [alg],
  };

  return verify(token, env.signSecret(), jwtOptions);
};
