import { LoadingOutlined } from '@ant-design/icons';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/components/Layout';
import { RouteNoMatch } from './RouteNoMatch';

const Home = React.lazy(() => import('../pages/Home'));

export const Path = Object.freeze({
  home: '/',
  userLogin: '/user/login',
  userLogout: '/user/logout',
});

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
      <Route path="*" element={<RouteNoMatch />} />
    </Route>
  </Routes>
);
