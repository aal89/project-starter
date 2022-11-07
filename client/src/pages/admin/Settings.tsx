import { Permission } from '@project-starter/shared/build';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { useLayoutVars } from '../../hooks/layout-vars';
import { ListUsersTable } from './components/ListUsersTable';
import { Stats } from './components/Stats';

const Settings: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const intl = useIntl();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'Admin.Title' }));
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
