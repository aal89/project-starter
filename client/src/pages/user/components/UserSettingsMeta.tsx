import { Space, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { User } from '../../../graphql/generated/graphql';

const { Text } = Typography;

type UserSettingsMetaProps = {
  user: User;
};

export const UserSettingsMeta: React.FC<UserSettingsMetaProps> = ({ user }) => (
  <Space direction="vertical">
    <Text strong>Last registered online date:</Text>
    <Text>{moment(user.lastOnlineAt).fromNow()}</Text>
    <Text strong>Member since:</Text>
    <Text>{moment(user.createdAt).fromNow()}</Text>
  </Space>
);
