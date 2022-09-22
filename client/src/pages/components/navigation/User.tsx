import { UserOutlined } from '@ant-design/icons';
import {
  Typography, Avatar, Space, Dropdown, Menu,
} from 'antd';
import React from 'react';
import { useMeQuery } from '../../../graphql/generated/graphql';
import { useAuth } from '../../../hooks/auth';
import { Spinner } from '../Spinner';
import { userMenu } from './UserMenuItems';

const { Text } = Typography;

export const User: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Dropdown overlay={<Menu items={userMenu(isLoggedIn())} />} placement="bottomRight">
      <Space>
        <Text>{data?.me.name ?? 'Account'}</Text>
        <Avatar
          src={isLoggedIn() ? 'https://joeschmoe.io/api/v1/random' : ''}
          icon={<UserOutlined />}
        />
      </Space>
    </Dropdown>
  );
};
