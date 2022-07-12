import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from './components/Layout';

const { Text } = Typography;

const Home: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Home');
    setMenuKey('0');
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
