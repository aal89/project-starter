export const ormconfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
    },
    ignoreErrors: true,
  },
};
