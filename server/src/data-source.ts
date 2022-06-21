import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';

export const AppDataSource = new DataSource({
  type: env.dataSource.connection() as 'mysql',
  host: env.dataSource.host(),
  port: env.dataSource.port(),
  username: env.dataSource.user(),
  password: env.dataSource.pass(),
  database: env.dataSource.db(),
  synchronize: env.dataSource.sync(),
  logging: env.dataSource.log(),
  entities: [env.dataSource.entities()],
  migrations: [env.dataSource.migrations()],
  subscribers: [],
  cache: {
    type: env.dataSource.cache() as 'database',
    options: env.dataSource.cacheOptions(),
    ignoreErrors: env.dataSource.cacheIgnoreErrors(),
  },
});
