import {
  Form, Input, Button, message, Typography, Space,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { MeDocument, useEditMeMutation, UserModel } from '../../../graphql/generated/graphql';
import { UserSettingsTitle } from './UserSettingsTitle';

const { Title } = Typography;

type UserSettingsEditUserProps = {
  user: UserModel;
};

export const UserSettingsEditUser: React.FC<UserSettingsEditUserProps> = ({ user }) => {
  const [editMeMutation, { loading }] = useEditMeMutation();
  const intl = useIntl();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await editMeMutation({
        variables: {
          name: values.name,
          lastName: values.lastName,
          image: user.image,
        },
        refetchQueries: [MeDocument],
      });

      message.success(intl.formatMessage({ id: 'Settings.User.Success' }));
    } catch {
      message.error(intl.formatMessage({ id: 'Settings.User.Error' }));
    }
  };

  return (
    <>
      <Title level={5}>
        <FormattedMessage id="Settings.User.Title" />
      </Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <UserSettingsTitle user={user} />
        <Form
          initialValues={{
            name: user?.name,
            lastName: user?.lastName,
            username: user?.username,
            password: '',
          }}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            label={intl.formatMessage({ id: 'Settings.User.Name.Label' })}
            name="name"
            rules={[{ required: true, message: intl.formatMessage({ id: 'Rules.Name.Required' }) }]}
          >
            <Input placeholder={intl.formatMessage({ id: 'Settings.User.Name.Input' })} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({ id: 'Settings.User.LastName.Label' })}
            name="lastName"
          >
            <Input placeholder={intl.formatMessage({ id: 'Settings.User.LastName.Input' })} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({ id: 'Settings.User.UserName.Label' })}
            name="username"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              <FormattedMessage id="Settings.User.Submit" />
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
