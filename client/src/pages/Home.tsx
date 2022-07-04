import { Typography } from 'antd';
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
      <Text>
        Hello world
      </Text>
    </>
  );
};

export default Home;
