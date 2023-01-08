import {
  Row, Col, Button, Form, Input, message,
} from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useChangePasswordByCodeMutation } from '../../graphql/generated/graphql';
import { useAuth } from '../../hooks/auth';
import { useLayoutVars } from '../../hooks/layout-vars';
import { getFormatId } from '../../locales';

const ResetPassword: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [changePasswordMutation, { loading }] = useChangePasswordByCodeMutation();
  const { username, code } = useParams();
  const { goLogin } = useAuth();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'ResetPassword.Title' }));
  }, []);

  const onSubmit = async (values: Record<string, any>) => {
    if (!username || !code) {
      message.error(intl.formatMessage({ id: 'Settings.Password.Error' }));
      return;
    }

    try {
      await changePasswordMutation({
        variables: {
          username,
          code,
          newPassword: values.new_password,
        },
      });

      form.resetFields();

      goLogin();

      message.success(intl.formatMessage({ id: 'Settings.Password.Success' }));
    } catch (err) {
      const { formatId, meta } = getFormatId(err, { id: 'Settings.Password.Error' });
      message.error(intl.formatMessage(formatId, meta));
    }
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={8} lg={8}>
        <Form form={form} onFinish={onSubmit} layout="vertical">
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
      </Col>
    </Row>
  );
};

export default withCleanLayoutVars(ResetPassword);
