import { can as sharedCan, Permission } from '@project-starter/shared';
import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';
import { validateAccessToken } from './auth/token';
import { User } from './generated/graphql';
import { typeDefs, resolvers } from './schema';

export type ContextType = {
  user?: User;
  userCan: (assertedPermission: Permission) => boolean;
  can: typeof sharedCan;
};

export default async (app: express.Application) => {
  const context = async ({ req }: { req: Request }): Promise<ContextType> => {
    const { authorization: token } = req.headers;
    const [, jwt] = token?.split(' ') ?? [];

    try {
      const { user } = await validateAccessToken(jwt ?? '');
      const userCan = (p: Permission) => sharedCan(p, user.permissions);

      return {
        user,
        userCan,
        can: sharedCan,
      };
    } catch {
      return {
        userCan: () => false,
        can: sharedCan,
      };
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });

  await server.start();

  server.applyMiddleware({ app });
};
