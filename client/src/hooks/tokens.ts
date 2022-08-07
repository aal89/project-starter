import jwtDecode from 'jwt-decode';
import { useStorageState } from './storage-state';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const getExpClaim = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);

    return exp;
  } catch {
    return 0;
  }
};

export const isExpired = (token: string) => (new Date().getTime() / 1000) > getExpClaim(token);

export const useTokens = () => {
  const [accessToken, setAccessToken] = useStorageState(ACCESS_TOKEN_KEY);
  const [refreshToken, setRefreshToken] = useStorageState(REFRESH_TOKEN_KEY);

  const isAccessTokenExpired = () => isExpired(accessToken);
  const isRefreshTokenExpired = () => isExpired(refreshToken);

  return {
    setAccessToken,
    accessToken,
    isAccessTokenExpired,
    setRefreshToken,
    refreshToken,
    isRefreshTokenExpired,
  };
};
