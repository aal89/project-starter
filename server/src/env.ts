export const env = {
  isDevelopment: () => process.env.NODE_ENV === 'development',
  port: () => process.env.PORT ?? 8000,
  signSecret: () => process.env.SIGN_SECRET ?? '',
};
