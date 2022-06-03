import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import {
  Tabs, Row, Col, Spin,
} from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { SetLayoutContext } from '../components/Layout';
import { ConditionalWrap } from '../components/ConditionalWrapper';

type LoginType = 'login' | 'create';

const upperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length);

type LoginCreateProps = {
  tab: LoginType;
};

const LoginCreate: React.FC<LoginCreateProps> = ({ tab }) => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const { navigateLogin, navigateCreate, login } = useAuth();
  const [doLogin, { done, loading: loginLoading }] = login();

  useEffect(() => {
    setLayoutProps({
      title: '',
      menuKey: '99',
    });
  }, []);

  useEffect(() => {
    console.log('intercept2', done);
  }, [done]);

  return (
    <ConditionalWrap condition={loginLoading} wrapper={(children) => <Spin tip="Loading...">{children}</Spin>}>
      <Row justify="center">
        <Col span={6}>
          <LoginForm
            onFinish={async (values) => {
              if (tab === 'login') {
                doLogin(values.login, values.password);
              }
            }}
            submitter={{
              searchConfig: {
                submitText: <>{upperCase(tab)}</>,
              },
            }}
          >
            <Tabs
              activeKey={tab}
              onChange={(activeKey) => {
                if (activeKey === 'login') {
                  navigateLogin();
                }
                if (activeKey === 'create') {
                  navigateCreate();
                }
              }}
            >
              <Tabs.TabPane key="login" tab="Login" />
              <Tabs.TabPane key="create" tab="Create account" />
            </Tabs>
            {tab === 'login' && (
              <>
                <ProFormText
                  name="login"
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
                <div
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <ProFormCheckbox noStyle fieldProps={{ checked: true }}>
                    Remember me
                  </ProFormCheckbox>
                </div>
              </>
            )}
            {tab === 'create' && (
              <>
                <ProFormText
                  name="login"
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
              </>
            )}
          </LoginForm>
        </Col>
      </Row>
    </ConditionalWrap>
  );
};

export default LoginCreate;
