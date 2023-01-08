import { MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import {
  Row, Col, Form, Button, message,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useRequestPasswordResetMutation } from '../../graphql/generated/graphql';
import { useLayoutVars } from '../../hooks/layout-vars';
import { getFormatId } from '../../locales';

const RequestPassword: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const intl = useIntl();
  const [form] = useForm();
  const [okDisabled, setOkDisabled] = useState(true);
  const [requestPasswordResetMutation, { loading }] = useRequestPasswordResetMutation();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'RequestPassword.Title' }));
  }, []);

  const onFieldsChange = async () => {
    const formValid = !!form.getFieldsError().flatMap((field) => field.errors).length;
    setOkDisabled(formValid);
  };

  const sendRequestPasswordReset = async () => {
    try {
      await requestPasswordResetMutation({
        variables: {
          email: form.getFieldValue(['email']),
        },
      });

      message.success(intl.formatMessage({ id: 'RequestPassword.Success' }));
    } catch (err) {
      const { formatId, meta } = getFormatId(err);
      message.error(intl.formatMessage(formatId, meta));
    }
  };

  return (
    <Row>
      <Col xs={24} sm={18} md={12} lg={6}>
        <Form form={form} onFieldsChange={onFieldsChange}>
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className="prefixIcon" />,
            }}
            placeholder={intl.formatMessage({ id: 'LoginCreate.Email' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'Rules.Email.Required' }),
              },
              { type: 'email', message: intl.formatMessage({ id: 'Rules.Email.Type' }) },
            ]}
          />
          <Button
            type="primary"
            onClick={sendRequestPasswordReset}
            disabled={okDisabled}
            loading={loading}
          >
            <FormattedMessage id="RequestPassword.Submit" />
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default withCleanLayoutVars(RequestPassword);
