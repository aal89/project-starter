import { Space, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { UserModel } from '../../../graphql/generated/graphql';

const { Text } = Typography;

type UserSettingsTitleProps = {
  user: UserModel | null;
};

export const UserSettingsTitle: React.FC<UserSettingsTitleProps> = ({ user }) => (
  <Space>
    <Text strong>
      <FormattedMessage id="Settings.User.Email.Label" />
      :
    </Text>
    <Text>{user?.email}</Text>
  </Space>
);
