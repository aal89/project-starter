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

  try {
    const options = {
      key: readFileSync(path.join(__dirname, './key.pem')),
      cert: readFileSync(path.join(__dirname, './certificate.pem')),
    };

    http.createServer(app).listen(env.httpPort(), () => {
      log.info(`http live on ${env.httpPort()}`);
    });

    https.createServer(options, app).listen(env.httpsPort(), () => {
      log.info(`https live on ${env.httpsPort()}`);
    });
  } catch (err) {
    log.error('Could not start webservers.', err);
  }
})();
