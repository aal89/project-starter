import { config as configureDotEnv } from 'dotenv';
import express from 'express';
import { AppDataSource } from './data-source';
import graphql from './graphql/apollo-server';

(async () => {
  configureDotEnv();
  const app = express();

  await graphql(app);

  await AppDataSource.initialize();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 [server] live on ${process.env.PORT}`);
  });
})();
