import {
  Form, Input, Button, message, Typography, Space,
} from 'antd';
import React from 'react';
import { MeDocument, useEditMeMutation, UserModel } from '../../../graphql/generated/graphql';
import { UserSettingsTitle } from './UserSettingsTitle';

const { Title } = Typography;

type UserSettingsEditUserProps = {
  user: UserModel;
};

export const UserSettingsEditUser: React.FC<UserSettingsEditUserProps> = ({ user }) => {
  const [editMeMutation, { loading }] = useEditMeMutation();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await editMeMutation({
        variables: {
          name: values.name,
          lastName: values.lastName,
        },
        refetchQueries: [MeDocument],
      });

      message.success('Successfully updated your profile');
    } catch {
      message.error('Could not update your profile, try again later');
    }
  };

  return (
    <>
      <Title level={5}>Names</Title>
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name…" />
          </Form.Item>

          <Form.Item label="Last name" name="lastName">
            <Input placeholder="Last name…" />
          </Form.Item>

          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
