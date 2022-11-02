import { readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { env } from './env';
import graphql from './graphql/apollo-server';
import { log } from './logger/log';

const client = (file = '') => path.join(__dirname, '../../client/build', file);

(async () => {
  const app = express();

  await graphql(app);

  await AppDataSource.initialize();

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.secure || req.hostname === 'localhost') {
      return next();
    }

    return res.redirect(`https://${req.hostname}${req.originalUrl}`);
  });

  app.use(compression());
  app.use(
    express.static(client(), {
      cacheControl: true,
      maxAge: 604800000,
    }),
  );

  app.use((_: Request, res: Response) => {
    res.sendFile(client('index.html'));
  });

  const options = {
    key: readFileSync(path.join(__dirname, './self_signed_key.pem')),
    cert: readFileSync(path.join(__dirname, './self_signed_certificate.pem')),
  };

  http.createServer(app).listen(env.port(), () => {
    log.info(`http live on ${env.port()}`);
  });

  https.createServer(options, app).listen(443, () => {
    log.info('https live on 443');
  });
})();
