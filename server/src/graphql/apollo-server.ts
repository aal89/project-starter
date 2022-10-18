import { can as sharedCan, Permission } from '@project-starter/shared/build';
import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';
import { createChildTraceLogger, log } from '../logger/log';
import { validateAccessToken } from './auth/token';
import { UserModel } from './generated/graphql';
import { typeDefs, resolvers } from './schema';

export type ContextType = {
  user?: UserModel;
  userCan: (...permissions: Permission[]) => boolean;
  can: typeof sharedCan;
  logger: typeof log;
  trace: string;
};

export default async (app: express.Application) => {
  const context = async ({ req }: { req: Request }): Promise<ContextType> => {
    const { authorization: token } = req.headers;
    const [, jwt] = token?.split(' ') ?? [];
    const logger = createChildTraceLogger();
    const trace = String(logger.fields.trace ?? '');

    try {
      const { user } = await validateAccessToken(jwt ?? '');
      const userCan = (...permissions: Permission[]) => {
        return permissions.every((p) => sharedCan(p, user.encodedPermissions));
      };

      return {
        user,
        userCan,
        can: sharedCan,
        logger,
        trace,
      };
    } catch {
      return {
        userCan: () => false,
        can: sharedCan,
        logger,
        trace,
      };
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: true,
    cache: 'bounded',
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: { origin: ['http://localhost:3000', 'https://localhost:3000'] },
  });
};
