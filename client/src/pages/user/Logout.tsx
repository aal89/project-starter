import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const Logout: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();
  const { logout } = useAuth();

  useEffect(() => {
    setTitle('Bye!');
    setMenuKey('99');

    logout();
  }, []);

  return <Spinner tip="Logging out…" />;
};

export default Logout;
