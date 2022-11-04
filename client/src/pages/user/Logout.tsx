import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useAuth } from '../../hooks/auth';
import { Spinner } from '../components/Spinner';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    logout();
  }, []);

  return <Spinner tip={intl.formatMessage({ id: 'Logout.Logout' })} />;
};

export default withCleanLayoutVars(Logout);
