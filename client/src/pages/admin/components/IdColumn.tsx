import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

type IdColumnProps = {
  text: string;
}

export const IdColumn: React.FC<IdColumnProps> = ({ text }) => (
  <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
    {text}
  </Text>
);
