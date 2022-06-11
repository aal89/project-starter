export const env = {
  isDevelopment: () => process.env.NODE_ENV === 'development',
  port: () => process.env.PORT ?? 8000,
  signAccessTokenSecret: () => process.env.SIGN_ACCESS_SECRET ?? '',
  signRefreshTokenSecret: () => process.env.SIGN_REFRESH_SECRET ?? '',
};
