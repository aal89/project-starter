import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Typography } from 'antd';
import { getImageUrl } from '../../../user';

const { Text } = Typography;

type NameColumProps = {
  text: string;
  avatarUrl?: string | null;
};

export const NameColumn: React.FC<NameColumProps> = ({ text, avatarUrl }) => (
  <Space>
    <Avatar src={getImageUrl(avatarUrl)} icon={<UserOutlined />} size="small" />
    <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
      {text}
    </Text>
  </Space>
);
