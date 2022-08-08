/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ProtectedRoute, ProtectedRouteProps } from '../routing/ProtectedRoute';

// eslint-disable-next-line max-len
export const withProtectedRoute = <Props extends object>(Component: React.ComponentType<Props>) => (props: ProtectedRouteProps & Props) => {
  const { required, ...rest } = props;
  return (
    <ProtectedRoute required={required}>
      <Component {...(rest as Props)} />
    </ProtectedRoute>
  );
};
