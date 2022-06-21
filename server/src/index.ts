import express from 'express';
import { AppDataSource } from './data-source';
import { env } from './env';
import graphql from './graphql/apollo-server';

(async () => {
  const app = express();

  await graphql(app);

  await AppDataSource.initialize();

  app.listen(env.port(), () => {
    console.log(`🚀[server] live on ${env.port()}`);
  });
})();
