import { Form, Input, Button } from 'antd';
import React from 'react';

export const UserSettingsChangePassword: React.FC = () => {
  const onSubmit = async (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <Form
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Current password"
        name="cur_password"
        rules={[{ required: true, message: 'Please input your current password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="new_password"
        rules={[{ required: true, message: 'Input a new password!' }]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
