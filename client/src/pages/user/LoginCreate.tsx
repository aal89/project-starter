import {
  EditOutlined, LockOutlined, MailOutlined, UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Tabs, Row, Col } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useAuth } from '../../hooks/auth';

type LoginType = 'login' | 'signup';

const upperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length);

const DivBottomSpacing = styled.div`
  margin-bottom: 24px;
`;

type LoginCreateProps = {
  tab: LoginType;
};

const LoginCreate: React.FC<LoginCreateProps> = ({ tab }) => {
  const intl = useIntl();
  const [rememberMe, setRememberMe] = useState(true);
  const {
    signup, login, loginLoading, signupLoading, goLogin, goSignup,
  } = useAuth();

  return (
    <Row justify="center">
      <Col>
        <LoginForm
          onFinish={async (values) => {
            if (tab === 'login') {
              login(values.username, values.password, rememberMe);
            }
            if (tab === 'signup') {
              signup(values.username, values.password, values.email, values.name);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({ id: `LoginCreate.${upperCase(tab)}` }),
            },
            submitButtonProps: {
              loading: loginLoading || signupLoading,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
        >
          <Tabs
            activeKey={tab}
            onChange={(activeKey) => {
              if (activeKey === 'login') {
                goLogin();
              }
              if (activeKey === 'signup') {
                goSignup();
              }
            }}
          >
            <Tabs.TabPane key="login" tab={intl.formatMessage({ id: 'LoginCreate.Login' })} />
            <Tabs.TabPane key="signup" tab={intl.formatMessage({ id: 'LoginCreate.Signup.SubText' })} />
          </Tabs>
          {tab === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                placeholder={intl.formatMessage({ id: 'LoginCreate.Username' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Rules.Username.Required' }),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder={intl.formatMessage({ id: 'LoginCreate.Password' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Rules.Password.Required' }),
                  },
                ]}
              />
              <DivBottomSpacing>
                <ProFormCheckbox
                  noStyle
                  fieldProps={{
                    checked: rememberMe,
                    onChange: (e) => {
                      setRememberMe(e.target.checked);
                    },
                  }}
                >
                  <FormattedMessage id="LoginCreate.Login.Remember" />
                </ProFormCheckbox>
              </DivBottomSpacing>
            </>
          )}
          {tab === 'signup' && (
            <>
              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <EditOutlined className="prefixIcon" />,
                }}
                placeholder={intl.formatMessage({ id: 'LoginCreate.Name' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Rules.Name.Required' }),
                  },
                ]}
              />
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
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                placeholder={intl.formatMessage({ id: 'LoginCreate.Username' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Rules.Username.Required' }),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder={intl.formatMessage({ id: 'LoginCreate.Password' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Rules.Password.Required' }),
                  },
                  {
                    min: 8,
                    message: intl.formatMessage({ id: 'Rules.Password.MinLength' }),
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </Col>
    </Row>
  );
};

export default withCleanLayoutVars(LoginCreate);
