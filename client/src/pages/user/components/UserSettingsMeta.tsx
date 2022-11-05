import { Space, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { UserModel } from '../../../graphql/generated/graphql';

const { Text } = Typography;

type UserSettingsMetaProps = {
  user: UserModel;
};

export const UserSettingsMeta: React.FC<UserSettingsMetaProps> = ({ user }) => (
  <Space direction="vertical">
    <Text strong>
      <FormattedMessage id="Settings.User.Meta.LastOnline" />
      :
    </Text>
    <Text>{moment(user.lastOnlineAt).fromNow()}</Text>
    <Text strong>
      <FormattedMessage id="Settings.User.Meta.MemberSince" />
      :
    </Text>
    <Text>{moment(user.createdAt).fromNow()}</Text>
  </Space>
);
