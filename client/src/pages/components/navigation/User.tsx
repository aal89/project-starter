import { UserOutlined } from '@ant-design/icons';
import {
  Typography, Avatar, Space, Dropdown, Menu,
} from 'antd';
import React from 'react';
import { useAuth } from '../../../hooks/auth';
import { userMenu } from './UserMenuItems';

const { Text } = Typography;

export const User: React.FC = () => {
  const { user } = useAuth();

  return (
    <Dropdown overlay={<Menu items={userMenu(!!user)} />} placement="bottomRight">
      <Space>
        <Text>{user?.name ?? 'Account'}</Text>
        <Avatar src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  );
};
