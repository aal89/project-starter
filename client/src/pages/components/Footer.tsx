import { Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const Footer: React.FC = () => (
  <Text>
    &copy;2022&nbsp;-&nbsp;
    {process.env.REACT_APP_PROJECT_NAME}
  </Text>
);
