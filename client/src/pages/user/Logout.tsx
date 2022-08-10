import React, { useEffect } from 'react';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useAuth } from '../../hooks/auth';
import { Spinner } from '../components/Spinner';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <Spinner tip="Logging out…" />;
};

export default withCleanLayoutVars(Logout);
