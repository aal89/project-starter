import { Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const { Text } = Typography;

const Settings: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const { data, loading, fetchMore } = useGetUsersQuery({
    variables: {
      offset: 0,
      limit: 1,
    },
  });

  useEffect(() => {
    setLayoutProps({
      title: 'Settings',
      menuKey: '99',
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Text>{JSON.stringify(data)}</Text>
      <Button
        onClick={() => fetchMore({
          variables: {
            offset: data?.users.length ?? 1,
          },
        })}
      >
        Fetch more
      </Button>
    </>
  );
};

export default Settings;
