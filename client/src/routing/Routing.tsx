import { LoadingOutlined } from '@ant-design/icons';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/components/Layout';
import { Path } from './Path';
import { RouteNoMatch } from './RouteNoMatch';

const Home = React.lazy(() => import('../pages/Home'));
const Activate = React.lazy(() => import('../pages/user/Activate'));
const RequestActivate = React.lazy(() => import('../pages/user/RequestActivate'));
const RequestPassword = React.lazy(() => import('../pages/user/RequestPassword'));
const LoginCreate = React.lazy(() => import('../pages/user/LoginCreate'));
const Logout = React.lazy(() => import('../pages/user/Logout'));
const Settings = React.lazy(() => import('../pages/user/Settings'));
const AdminSettings = React.lazy(() => import('../pages/admin/Settings'));

const Suspended = (element: JSX.Element) => (
  <Suspense fallback={<LoadingOutlined />}>{element}</Suspense>
);

export const Routing: React.FC = () => (
  <Routes>
    <Route path={Path.home} element={<Layout />}>
      <Route index element={Suspended(<Home />)} />
      <Route path={Path.userActivate} element={Suspended(<Activate />)} />
      <Route path={Path.userRequestActivate} element={Suspended(<RequestActivate />)} />
      <Route path={Path.userRequestPassword} element={Suspended(<RequestPassword />)} />
      <Route path={Path.userLogin} element={Suspended(<LoginCreate tab="login" />)} />
      <Route path={Path.userSignup} element={Suspended(<LoginCreate tab="signup" />)} />
      <Route path={Path.userLogout} element={Suspended(<Logout />)} />
      <Route path={Path.userSettings} element={Suspended(<Settings />)} />
      <Route path={Path.adminSettings} element={Suspended(<AdminSettings />)} />
      <Route path="*" element={<RouteNoMatch />} />
    </Route>
  </Routes>
);
