import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useAuth } from '../../hooks/auth';
import { Spinner } from '../components/Spinner';

const Activate: React.FC = () => {
  const { activate } = useAuth();
  const { username, code } = useParams();

  useEffect(() => {
    if (username && code) {
      activate(username, code);
    }
  }, [username, code]);

  return <Spinner />;
};

export default withCleanLayoutVars(Activate);
