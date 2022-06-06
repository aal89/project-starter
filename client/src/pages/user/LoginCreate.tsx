import { EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Tabs, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { SetLayoutContext } from '../components/Layout';

type LoginType = 'login' | 'signup';

const upperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length);

const DivBottomSpacing = styled.div`
  margin-bottom: 24px;
`;

type LoginCreateProps = {
  tab: LoginType;
};

const LoginCreate: React.FC<LoginCreateProps> = ({ tab }) => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const { signup, login } = useAuth();
  const [doLogin, goLogin, { loading: loginLoading }] = login();
  const [doSignup, goSignup, { loading: signupLoading }] = signup();

  useEffect(() => {
    setLayoutProps({
      title: '',
      menuKey: '99',
    });
  }, []);

  return (
    <Row justify="center">
      <Col span={6}>
        <LoginForm
          onFinish={async (values) => {
            if (tab === 'login') {
              doLogin(values.username, values.password);
            }
            if (tab === 'signup') {
              doSignup(values.username, values.password, values.name);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: <>{upperCase(tab)}</>,
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
            <Tabs.TabPane key="login" tab="Login" />
            <Tabs.TabPane key="signup" tab="Create account" />
          </Tabs>
          {tab === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                placeholder="Username"
                rules={[
                  {
                    required: true,
                    message: 'Username cannot be empty',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: 'Password cannot be empty',
                  },
                ]}
              />
              <DivBottomSpacing>
                <ProFormCheckbox noStyle fieldProps={{ checked: true }}>
                  Remember me
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
                placeholder="Name"
                rules={[
                  {
                    required: true,
                    message: 'Name cannot be empty',
                  },
                ]}
              />
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                placeholder="Username"
                rules={[
                  {
                    required: true,
                    message: 'Username cannot be empty',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: 'Password cannot be empty',
                  },
                  {
                    min: 8,
                    message: 'Minimal password length is 8 characters',
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

export default LoginCreate;
