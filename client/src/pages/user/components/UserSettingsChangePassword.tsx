import {
  Form, Input, Button, message,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useChangePasswordMutation } from '../../../graphql/generated/graphql';

export const UserSettingsChangePassword: React.FC = () => {
  const [changePasswordMutation, { loading }] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const intl = useIntl();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await changePasswordMutation({
        variables: {
          oldPassword: values.cur_password,
          newPassword: values.new_password,
        },
      });

      form.resetFields();

      message.success(intl.formatMessage({ id: 'Settings.Password.Success' }));
    } catch (err) {
      message.error(
        (err as Error).message ?? intl.formatMessage({ id: 'Settings.Password.Error' }),
      );
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        label={intl.formatMessage({ id: 'Settings.Password.Current.Label' })}
        name="cur_password"
        rules={[{ required: true, message: intl.formatMessage({ id: 'Rules.Password.Required' }) }]}
      >
        <Input.Password
          placeholder={intl.formatMessage({ id: 'Settings.Password.Current.Input' })}
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ id: 'Settings.Password.New.Label' })}
        name="new_password"
        rules={[
          { required: true, message: intl.formatMessage({ id: 'Rules.Password.Required' }) },
          {
            min: 8,
            message: intl.formatMessage({ id: 'Rules.Password.MinLength' }),
          },
        ]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder={intl.formatMessage({ id: 'Settings.Password.New.Input' })}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          <FormattedMessage id="Settings.Password.Submit" />
        </Button>
      </Form.Item>
    </Form>
  );
};
