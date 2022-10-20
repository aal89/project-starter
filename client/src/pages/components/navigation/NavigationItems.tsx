import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Link } from 'react-router-dom';

export const navigation: ItemType[] = [
  {
    key: 1,
    label: <Link to="/example">Menu item</Link>,
  },
  {
    key: 2,
    label: <Link to="/example">Another menu item</Link>,
  },
];
