/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ProtectedRoute, ProtectedRouteProps } from '../routing/ProtectedRoute';

export const withProtectedRoute = <Props extends object>(
  Component: React.ComponentType<Props>,
  protectedProps: ProtectedRouteProps = {},
) => (props: Props) => (
    <ProtectedRoute {...protectedProps}>
      <Component {...props} />
    </ProtectedRoute>
  );
