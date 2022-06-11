import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';
import { ClientUser, validateToken } from '../token';
import { typeDefs, resolvers } from './schema';

export type ContextType = {
  user?: ClientUser;
  roles: string[];
  permissions: string[];
};

export default async (app: express.Application) => {
  const context = async ({ req }: { req: Request }): Promise<ContextType> => {
    const { authorization: token } = req.headers;
    const [, jwt] = token?.split(' ') ?? [];

    try {
      const { user, roles, permissions } = await validateToken(jwt ?? '');

      return {
        user,
        roles,
        permissions,
      };
    } catch {
      return {
        roles: [],
        permissions: [],
      };
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });

  await server.start();

  server.applyMiddleware({ app });
};
