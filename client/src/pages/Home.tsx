import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
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
        Hello world (online)
      </Text>
    </>
  );
};

export default withCleanLayoutVars(Home);
