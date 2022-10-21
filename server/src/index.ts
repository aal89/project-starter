import path from 'path';
import compression from 'compression';
import express from 'express';
import { AppDataSource } from './data-source';
import { env } from './env';
import graphql from './graphql/apollo-server';
import { log } from './logger/log';

const client = (file = '') => path.join(__dirname, '../../client/build', file);

(async () => {
  const app = express();

  await graphql(app);

  await AppDataSource.initialize();

  app.use(compression());
  app.use(express.static(client(), {
    cacheControl: true,
    maxAge: 604800000,
  }));

  app.use((req, res) => {
    res.sendFile(client('index.html'));
  });

  app.listen(env.port(), () => {
    log.info(`live on ${env.port()}`);
  });
})();
