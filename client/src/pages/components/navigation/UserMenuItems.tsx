import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Link } from 'react-router-dom';

const loggedInMenu: ItemType[] = [
  {
    label: <Link to="/user/settings">Settings</Link>,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to="/user/logout">Logout</Link>,
    key: '3',
  },
];

const loggedOutMenu: ItemType[] = [
  {
    label: <Link to="/user/create">Create an account</Link>,
    key: '0',
  },
  {
    label: <Link to="/user/reset">Reset password</Link>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to="/asdf/asdf">Login</Link>,
    key: '3',
  },
];

export const userMenu = (isLoggedIn: boolean) => (isLoggedIn ? loggedInMenu : loggedOutMenu);
