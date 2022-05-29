/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Tabs, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Path } from '../../routing/Path';
import { SetLayoutContext } from '../components/Layout';

type LoginType = 'login' | 'create';

const upperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length);

type LoginCreateProps = {
  tab: LoginType;
};

const LoginCreate: React.FC<LoginCreateProps> = ({ tab }) => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();
  const navigate = useNavigate();

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
                navigate(Path.userLogin);
              }
              if (activeKey === 'create') {
                navigate(Path.userCreate);
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
  );
};

export default LoginCreate;
