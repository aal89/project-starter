import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Link } from 'react-router-dom';

export const navigation: ItemType[] = [
  {
    key: 0,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 1,
    label: <Link to="/example">Example (404)</Link>,
  },
];
