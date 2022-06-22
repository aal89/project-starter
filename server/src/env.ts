import { config as configureDotEnv } from 'dotenv';

configureDotEnv();

export const env = {
  isDevelopment: () => process.env.NODE_ENV === 'development',
  port: () => process.env.PORT ?? 8000,
  signAccessTokenSecret: () => process.env.SIGN_ACCESS_SECRET ?? '',
  signRefreshTokenSecret: () => process.env.SIGN_REFRESH_SECRET ?? '',
  dataSource: {
    connection: () => process.env.TYPEORM_CONNECTION ?? '',
    host: () => process.env.TYPEORM_HOST ?? '',
    user: () => process.env.TYPEORM_USERNAME ?? '',
    pass: () => process.env.TYPEORM_PASSWORD ?? '',
    db: () => process.env.TYPEORM_DATABASE ?? '',
    port: () => Number(process.env.TYPEORM_PORT ?? 1337),
    sync: () => process.env.TYPEORM_SYNCHRONIZE === 'true',
    log: () => process.env.TYPEORM_LOGGING === 'true',
    entities: () => process.env.TYPEORM_ENTITIES ?? '',
    migrations: () => process.env.TYPEORM_MIGRATIONS ?? '',
    subscribers: () => process.env.TYPEORM_SUBSCRIBERS ?? '',
    cache: () => process.env.TYPEORM_CACHE ?? '',
    cacheOptions: () => {
      try {
        return JSON.parse(process.env.TYPEORM_CACHE_OPTIONS ?? '{}');
      } catch {
        return '';
      }
    },
    cacheIgnoreErrors: () => process.env.TYPEORM_CACHE_IGNORE_ERRORS === 'true',
  },
};
