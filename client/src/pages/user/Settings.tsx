import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../components/Layout';

const { Text } = Typography;

const Settings: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Settings');
    setMenuKey('99');
  }, []);

  return (
    <>
      <Text>Hello settings!</Text>
    </>
  );
};

export default Settings;
