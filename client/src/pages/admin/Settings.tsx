import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { SetLayoutContext } from '../components/Layout';
import { ListUsersTable } from './components/ListUsersTable';
import { Stats } from './components/Stats';

const Settings: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Administrator');
    setMenuKey('99');
  }, []);

  return (
    <>
      <Stats />
      <ListUsersTable />
    </>
  );
};

export default withProtectedRoute(Settings);
