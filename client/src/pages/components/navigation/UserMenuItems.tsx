import {
  UserAddOutlined,
  UserSwitchOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../../routing/Path';

const loggedInMenu: ItemType[] = [
  {
    label: <Link to={Path.userSettings}>Settings</Link>,
    icon: <SettingFilled />,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to={Path.userLogout}>Logout</Link>,
    icon: <LogoutOutlined />,
    key: '3',
  },
];

const loggedOutMenu: ItemType[] = [
  {
    label: <Link to={Path.userCreate}>Create an account</Link>,
    icon: <UserAddOutlined />,
    key: '0',
  },
  {
    label: <Link to={Path.userResetPassword}>Reset password</Link>,
    icon: <UserSwitchOutlined />,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to={Path.userLogin}>Login</Link>,
    icon: <LoginOutlined />,
    key: '3',
  },
];

export const userMenu = (isLoggedIn: boolean) => (isLoggedIn ? loggedInMenu : loggedOutMenu);
