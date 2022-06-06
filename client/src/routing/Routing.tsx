import { LoadingOutlined } from '@ant-design/icons';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/components/Layout';
import { Path } from './Path';
import { RouteNoMatch } from './RouteNoMatch';

const Home = React.lazy(() => import('../pages/Home'));
const LoginCreate = React.lazy(() => import('../pages/user/LoginCreate'));
const Logout = React.lazy(() => import('../pages/user/Logout'));

export const Routing: React.FC = () => (
  <Routes>
    <Route path={Path.home} element={<Layout />}>
      <Route
        index
        element={(
          <Suspense fallback={<LoadingOutlined />}>
            <Home />
          </Suspense>
        )}
      />
      <Route
        path={Path.userLogin}
        element={(
          <Suspense fallback={<LoadingOutlined />}>
            <LoginCreate tab="login" />
          </Suspense>
        )}
      />
      <Route
        path={Path.userSignup}
        element={(
          <Suspense fallback={<LoadingOutlined />}>
            <LoginCreate tab="signup" />
          </Suspense>
        )}
      />
      <Route
        path={Path.userLogout}
        element={(
          <Suspense fallback={<LoadingOutlined />}>
            <Logout />
          </Suspense>
        )}
      />
      <Route path="*" element={<RouteNoMatch />} />
    </Route>
  </Routes>
);
