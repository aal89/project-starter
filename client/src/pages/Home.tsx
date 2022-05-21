import { Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from './components/Layout';

const { Text } = Typography;

const Home: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setLayoutProps({
      title: 'Home',
    });
  }, []);

  return (
    <>
      <Text>Hello world</Text>
      <br />
      <Button type="primary">Get started</Button>
    </>
  );
};

export default Home;
