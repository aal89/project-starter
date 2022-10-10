import { Permission } from '@project-starter/shared/build/permissions';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { SetLayoutContext } from '../components/Layout';
import { ListUsersTable } from './components/ListUsersTable';
import { Stats } from './components/Stats';

const Settings: React.FC = () => {
  const { setTitle } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Administrator');
  }, []);

  return (
    <>
      <Stats />
      <ListUsersTable />
    </>
  );
};

export default withProtectedRoute(withCleanLayoutVars(Settings), {
  required: [Permission.ADMINISTRATE],
});
