import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoggedIn } from '../pages/LoggedIn';
import { LoggedOut } from '../pages/LoggedOut';
import Test from '../pages/components/Listings';
import {
  AdminComponent,
} from '../pages/components/authorization/RestrictedComponents';
import { Layout } from './Layout';
import { RouteNoMatch } from './RouteNoMatch';

const Home = React.lazy(() => import('../pages/Home'));

export const Routing: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={(
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        )}
      />
      <Route path="/loggedin" element={<LoggedIn />} />
      <Route path="/loggedout" element={<LoggedOut />} />
      {/* <Route
        path="/test"
        element={(
          <GuardedComponent redirect>
            <Test />
          </GuardedComponent>
        )}
      /> */}
      <Route
        path="/property/create"
        element={(
          <AdminComponent redirect>
            <Test />
          </AdminComponent>
        )}
      />
      <Route path="*" element={<RouteNoMatch />} />
    </Route>
  </Routes>
);
