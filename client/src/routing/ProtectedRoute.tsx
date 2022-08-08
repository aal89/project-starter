import { Permission } from '@project-starter/shared/build';
import React from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { Path } from './Path';

export type ProtectedRouteProps = {
  required?: Array<Permission>;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, required = [] }) => {
  const { user, userCan } = useAuth();
  const context = useOutletContext();

  if (!user) {
    return <Navigate to={Path.home} replace />;
  }

  if (!!required.length && !required.every((permission) => userCan(permission))) {
    return <Navigate to={Path.home} replace />;
  }

  return <>{children || <Outlet context={context} />}</>;
};
