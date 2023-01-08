import { MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import {
  Row, Col, Form, Button, message,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useSendActivateMutation } from '../../graphql/generated/graphql';
import { useLayoutVars } from '../../hooks/layout-vars';
import { getFormatId } from '../../locales';

const RequestActivate: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const intl = useIntl();
  const [form] = useForm();
  const [okDisabled, setOkDisabled] = useState(true);
  const [sendActivateMutation, { loading }] = useSendActivateMutation();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'RequestActivate.Title' }));
  }, []);

  const onFieldsChange = async () => {
    const formValid = !!form.getFieldsError().flatMap((field) => field.errors).length;
    setOkDisabled(formValid);
  };

  const sendActivation = async () => {
    try {
      await sendActivateMutation({
        variables: {
          email: form.getFieldValue(['email']),
        },
      });

      message.success(intl.formatMessage({ id: 'RequestActivate.Success' }));
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
          <Button type="primary" onClick={sendActivation} disabled={okDisabled} loading={loading}>
            <FormattedMessage id="RequestActivate.Submit" />
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default withCleanLayoutVars(RequestActivate);
