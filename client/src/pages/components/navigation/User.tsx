import React from 'react';
import {
  Typography, Avatar, Space, Dropdown, Menu,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userMenu } from './UserMenuItems';
import { useAuth } from '../../../hooks/auth';

const { Text } = Typography;

export const User: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Dropdown overlay={<Menu items={userMenu(isLoggedIn())} />} placement="bottomRight">
      <Space>
        <Text>User</Text>
        <Avatar icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  );
};
