import { message, Pagination, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const { Text } = Typography;

const Settings: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useGetUsersQuery({
    variables: {
      offset,
      limit: 1,
    },
  });

  useEffect(() => {
    setLayoutProps({
      title: 'Settings',
      menuKey: '99',
    });
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Text>{JSON.stringify(data?.users.users)}</Text>
      <Pagination
        pageSize={1}
        current={offset + 1}
        total={data?.users.total}
        hideOnSinglePage
        onChange={(page) => setOffset(page - 1)}
      />
    </>
  );
};

export default Settings;
