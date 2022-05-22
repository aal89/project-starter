import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Link } from 'react-router-dom';

export const userMenu: ItemType[] = [
  {
    label: <Link to="/user/settings">Settings</Link>,
    key: '0',
  },
  {
    label: <Link to="/user/payments">Payment options</Link>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to="/user/logout">Logout</Link>,
    key: '3',
  },
];
