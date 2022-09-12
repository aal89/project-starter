import {
  Form, Input, Button, message,
} from 'antd';
import React from 'react';
import { useChangePasswordMutation } from '../../../graphql/generated/graphql';

export const UserSettingsChangePassword: React.FC = () => {
  const [changePasswordMutation, { loading }] = useChangePasswordMutation();
  const [form] = Form.useForm();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await changePasswordMutation({
        variables: {
          oldPassword: values.cur_password,
          newPassword: values.new_password,
        },
      });

      form.resetFields();

      message.success('Successfully set your new password');
    } catch (err) {
      message.error((err as Error).message ?? 'Could not update your password, try again later');
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        label="Current password"
        name="cur_password"
        rules={[{ required: true, message: 'Please input your current password!' }]}
      >
        <Input.Password placeholder="Your current password…" />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="new_password"
        rules={[
          { required: true, message: 'Input a new password!' },
          {
            min: 8,
            message: 'Minimal password length is 8 characters',
          },
        ]}
      >
        <Input.Password autoComplete="new-password" placeholder="Your new password…" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
