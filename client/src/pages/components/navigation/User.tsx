import { UserOutlined } from '@ant-design/icons';
import { Permission } from '@project-starter/shared/build';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { useAuth } from '../../../hooks/auth';
import { getImageUrl } from '../../../user';
import { userMenu } from './UserMenuItems';

export const User: React.FC = () => {
  const {
    isLoggedIn, user, userCan,
  } = useAuth();

  const menu = userMenu(isLoggedIn(), userCan(Permission.ADMINISTRATE));
  const avatarUrl = isLoggedIn() ? getImageUrl(user()!) : '';

  return (
    <Dropdown overlay={<Menu items={menu} />} placement="bottomRight">
      <Avatar src={avatarUrl} icon={<UserOutlined />} />
    </Dropdown>
  );
};
