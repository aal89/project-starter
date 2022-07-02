import { Permission } from '@project-starter/shared/build';
import { Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { SetLayoutContext } from './components/Layout';

const { Text } = Typography;

const Home: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const { refresh, refreshLoading, can } = useAuth();

  useEffect(() => {
    setLayoutProps({
      title: 'Home',
    });
  }, []);

  return (
    <>
      <Text>
        Hello world (is admin:&nbsp;
        {can(Permission.ADMINISTRATE) ? 'yes' : 'no'}
        )
      </Text>
      <br />
      <Button type="primary" onClick={refresh} loading={refreshLoading}>
        Get started
      </Button>
    </>
  );
};

export default Home;
