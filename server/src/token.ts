import { promisify } from 'util';
import jwt, {
  Secret, sign, VerifyOptions, Algorithm,
} from 'jsonwebtoken';
import { User } from './entities/User';
import { env } from './env';

export type ClientUser = Omit<User, 'password'>;

export type DecodedToken = {
  user: ClientUser;
  permissions: Array<string>;
  roles: Array<string>;
};

export const createToken = async (user: ClientUser) => sign(
  {
    user,
    permissions: [],
    roles: [],
  },
  env.signSecret(),
  { expiresIn: '30m' },
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
