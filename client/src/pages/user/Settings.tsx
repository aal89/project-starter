import { message, Pagination, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const { Text } = Typography;

const Settings: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  // const [oldPageSize, setOldPageSize] = useState(0);
  const {
    data, loading, error, fetchMore,
  } = useGetUsersQuery({
    fetchPolicy: 'no-cache',
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

  console.log(data?.users.users);

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
        total={data?.users.total}
        hideOnSinglePage
        onChange={(page, pageSize) => {
          const offset = page - 1;
          fetchMore({ variables: { offset, limit: pageSize } });
        }}
      />
      {/* <Button
        onClick={() => {
          setOldPageSize(data?.users.length ?? 0);
          return fetchMore({
            variables: {
              offset: data?.users.length ?? 1,
            },
          });
        }}
        disabled={!!error || oldPageSize === (data?.users.length ?? 0)}
      >
        Fetch more
      </Button> */}
    </>
  );
};

export default Settings;
