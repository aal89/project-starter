import { User } from '@auth0/auth0-react';
import { Maybe } from 'graphql/jsutils/Maybe';

export type AuthorizationClaims = {
  roles: string[];
  permissions: string[];
};

const isAuthorizationClaims = (o: any): o is AuthorizationClaims => o && o.roles && o.permissions;

const authz = {
  roles: {
    admin: 'Admin',
    propertyManager: 'Property manager',
  },
  permission: {
    createProperty: 'create:property',
  },
};

export const getAuthorizationClaims = (user: User): Maybe<AuthorizationClaims> => {
  try {
    const { authorization } = user['https://huistat.nl/app_metadata'];

    if (isAuthorizationClaims(authorization)) {
      return authorization;
    }

    return null;
  } catch {
    return null;
  }
};

export const isAdmin = (claims: AuthorizationClaims) => claims.roles.includes(authz.roles.admin);
