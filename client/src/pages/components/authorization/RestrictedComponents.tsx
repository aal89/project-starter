import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthorizationClaims, isAdmin } from './authorization';

type GuardedComponentProps = {
  redirect?: boolean;
};

export const GuardedComponent: React.FC<GuardedComponentProps> = ({
  redirect = false,
  children,
}) => {
  const { isAuthenticated } = useAuth0();

  if (redirect && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <></>;
};

export const AdminComponent: React.FC<GuardedComponentProps> = ({ redirect = false, children }) => {
  const { isAuthenticated, user } = useAuth0();
  const claims = getAuthorizationClaims(user ?? {});

  if (redirect && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (redirect && claims && !isAdmin(claims)) {
    return <Navigate to="/" />;
  }

  if (claims && isAdmin(claims)) {
    return <>{children}</>;
  }

  return <></>;
};
