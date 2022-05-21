import { Typography } from 'antd';
import React from 'react';
import config from '../../config';

const { Text } = Typography;

export const Footer: React.FC = () => (
  <Text>
    &copy;2022&nbsp;-&nbsp;
    {config.projectName}
  </Text>
);
