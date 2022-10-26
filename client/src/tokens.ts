import jwtDecode from 'jwt-decode';
import { UserModel } from './graphql/generated/graphql';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_KEY = 'user';

type UserModelNil = UserModel | null;

export const setUser = (user: UserModelNil) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = (): UserModelNil => JSON.parse(localStorage.getItem(USER_KEY) ?? '');
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
export const setAccessToken = (at: string) => localStorage.setItem(ACCESS_TOKEN_KEY, at);
export const setRefreshToken = (rt: string) => localStorage.setItem(REFRESH_TOKEN_KEY, rt);
export const isAccessTokenExpired = () => isExpired(getAccessToken());
export const isRefreshTokenExpired = () => isExpired(getRefreshToken());

export const getExpClaim = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);

    return exp;
  } catch {
    return 0;
  }
};

export const isExpired = (token: string) => new Date().getTime() / 1000 > getExpClaim(token);
