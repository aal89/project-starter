import { promisify } from 'util';
import jwt, {
  JwtHeader, Secret, VerifyOptions, Algorithm,
} from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export type DecodedToken = {
  'https://huistat.nl/app_metadata'?: {
    authorization: {
      roles: string[];
      permissions: string[];
    };
  };
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

export const fakeToken: DecodedToken = {
  'https://huistat.nl/app_metadata': {
    authorization: {
      roles: ['Property manager'],
      permissions: ['create:property'],
    },
  },
  iss: 'https://dev-bvddqmhe.us.auth0.com/',
  sub: 'auth0|61e46b56364b1d006afe3c41',
  aud: ['https://dev-bvddqmhe.us.auth0.com/api/v2/', 'https://dev-bvddqmhe.us.auth0.com/userinfo'],
  iat: 1649100149,
  exp: 1649186549,
  azp: 'xxHE0KSjvjg5gBih0hLOciyWNHEQEAhO',
  scope: 'openid profile email',
};

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = async (header: JwtHeader) => {
  const signingKey = await client.getSigningKey(header.kid);
  return signingKey.getPublicKey();
};

const isTokenValid = async (token: string): Promise<DecodedToken> => {
  if (!token || token.split('.').length !== 3) {
    throw new Error('Missing or invalid token');
  }

  const alg: Algorithm = 'RS256';
  const key = await getKey({ alg, kid: process.env.AUTH0_API_KID });
  const verify = promisify<string, Secret, VerifyOptions, string>(jwt.verify);
  const jwtOptions = {
    audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: [alg],
  };

  const decoded = await verify(token, key, jwtOptions);

  return decoded as unknown as DecodedToken;
};

export default isTokenValid;
