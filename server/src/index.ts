import path from 'path';
import express from 'express';
import { AppDataSource } from './data-source';
import { env } from './env';
import graphql from './graphql/apollo-server';

(async () => {
  const app = express();

  await graphql(app);

  await AppDataSource.initialize();

  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.listen(env.port(), () => {
    // eslint-disable-next-line no-console
    console.log(`🚀[server] live on ${env.port()}`);
  });
})();
