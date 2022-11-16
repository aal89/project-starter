import { config as configureDotEnv } from 'dotenv';

configureDotEnv();

export const env = {
  isDevelopment: () => process.env.NODE_ENV === 'development',
  httpPort: () => Number(process.env.HTTP_PORT ?? 8000),
  httpsPort: () => Number(process.env.HTTPS_PORT ?? 8433),
  dateLocale: () => process.env.DATE_LOCALE ?? 'en-US',
  projectName: () => process.env.PROJECT_NAME ?? 'Starter',
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
  aws: {
    keyId: () => process.env.AWS_ACCESS_KEY_ID ?? '',
    secret: () => process.env.AWS_SECRET_ACCESS_KEY ?? '',
    region: () => process.env.AWS_REGION ?? '',
    bucket: () => process.env.AWS_BUCKET ?? '',
    signExpiry: () => Number(process.env.AWS_BUCKEY_SIGN_EXPIRY ?? 0),
  },
  mail: {
    pool: () => process.env.MAIL_POOL ?? '',
    host: () => process.env.MAIL_HOST ?? '',
    port: () => Number(process.env.MAIL_PORT ?? 0),
    username: () => process.env.MAIL_USERNAME ?? '',
    password: () => process.env.MAIL_PASSWORD ?? '',
    from: () => process.env.MAIL_FROM ?? '',
  },
};
