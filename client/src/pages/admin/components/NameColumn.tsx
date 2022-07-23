import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Typography } from 'antd';

const { Text } = Typography;

type NameColumProps = {
  text: string;
};

export const NameColumn: React.FC<NameColumProps> = ({ text }) => (
  <Space>
    <Avatar src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} size="small" />
    <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
      {text}
    </Text>
  </Space>
);
