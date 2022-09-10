import {
  Form, Input, Button, message,
} from 'antd';
import React from 'react';
import { useEditMeMutation, User } from '../../../graphql/generated/graphql';

type UserSettingsEditUserProps = {
  user: User;
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
      });

      // TODO: refresh getUser queries
    } catch {
      message.error('Could not update your profile, try again later');
    }
  };

  return (
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
        <Input />
      </Form.Item>

      <Form.Item label="Last name" name="lastName">
        <Input />
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
  );
};
