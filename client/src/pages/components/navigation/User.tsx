import { UserOutlined } from '@ant-design/icons';
import {
  Typography, Avatar, Space, Dropdown, Menu,
} from 'antd';
import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks/auth';
import { userMenu } from './UserMenuItems';

const { Text } = Typography;

export const User: React.FC = () => {
  const { user } = useAuth();

  console.log('debug', 'header', user);

  useEffect(() => {
    console.log('debug', 'header2', user);
  }, []);

  return (
    <Dropdown overlay={<Menu items={userMenu(!!user)} />} placement="bottomRight">
      <Space>
        <Text>{user?.name ?? 'Account'}</Text>
        <Avatar icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  );
};
