import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';
import isTokenValid, { fakeToken } from '../token';
import { typeDefs, resolvers } from './schema';

export type ContextType = {
  roles: string[];
  permissions: string[];
};

export default async (app: express.Application) => {
  const context = async ({ req }: { req: Request }): Promise<ContextType> => {
    const { authorization: token } = req.headers;
    const [_, jwt] = token?.split(' ') ?? [];

    if (process.env.NODE_ENV === 'development') {
      return (
        fakeToken['https://huistat.nl/app_metadata']?.authorization ?? {
          roles: [],
          permissions: [],
        }
      );
    }

    const decoded = await isTokenValid(jwt ?? '');
    let roles: string[] = [];
    let permissions: string[] = [];

    if (decoded['https://huistat.nl/app_metadata']) {
      const {
        'https://huistat.nl/app_metadata': { authorization },
      } = decoded;
      roles = authorization.roles;
      permissions = authorization.permissions;
    }

    return {
      roles,
      permissions,
    };
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });

  await server.start();

  server.applyMiddleware({ app });
};
