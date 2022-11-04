import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingFilled,
  ControlOutlined,
} from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Path } from '../../../routing/Path';

const loggedInMenu: ItemType[] = [
  {
    label: (
      <Link to={Path.userSettings}>
        <FormattedMessage id="Menu.Settings" />
      </Link>
    ),
    icon: <SettingFilled />,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Link to={Path.userLogout}>
        <FormattedMessage id="Menu.Logout" />
      </Link>
    ),
    icon: <LogoutOutlined />,
    key: '3',
  },
];

const loggedOutMenu: ItemType[] = [
  {
    label: (
      <Link to={Path.userSignup}>
        <FormattedMessage id="Menu.CreateAccount" />
      </Link>
    ),
    icon: <UserAddOutlined />,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Link to={Path.userLogin}>
        <FormattedMessage id="Menu.Login" />
      </Link>
    ),
    icon: <LoginOutlined />,
    key: '3',
  },
];

export const userMenu = (isLoggedIn: boolean, isAdmin: boolean = false) => {
  let menu = isLoggedIn ? loggedInMenu : loggedOutMenu;

  if (isAdmin) {
    menu = [
      {
        label: <Link to={Path.adminSettings}>Admin</Link>,
        icon: <ControlOutlined />,
        key: '99',
      },
      ...menu,
    ];
  }

  return menu;
};
