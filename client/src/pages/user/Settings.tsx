import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const Settings: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setLayoutProps({
      title: 'Settings',
      menuKey: '99',
    });
  }, []);

  return <Spinner tip="Logging out…" />;
};

export default Settings;
