import { Space, Typography } from 'antd';
import React from 'react';
import { User } from '../../../graphql/generated/graphql';

const { Text } = Typography;

type UserSettingsTitleProps = {
  user: User | null;
};

export const UserSettingsTitle: React.FC<UserSettingsTitleProps> = ({ user }) => (
  <Space>
    <Text strong>Your email:</Text>
    <Text>{user?.email}</Text>
  </Space>
);
