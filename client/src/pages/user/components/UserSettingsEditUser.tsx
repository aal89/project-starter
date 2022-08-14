import { Form, Input, Button } from 'antd';
import React from 'react';
import { User } from '../../../graphql/generated/graphql';

type UserSettingsEditUserProps = {
  user: User;
};

export const UserSettingsEditUser: React.FC<UserSettingsEditUserProps> = ({ user }) => {
  const onSubmit = async (values: Record<string, any>) => {
    console.log(values);
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
