import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { useAuth } from '../../hooks/auth';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { UserSettingsChangePassword } from './components/UserSettingsChangePassword';
import { UserSettingsEditUser } from './components/UserSettingsEditUser';
import { UserSettingsImageUpload } from './components/UserSettingsImageUpload';
import { UserSettingsMeta } from './components/UserSettingsMeta';

const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { setTitle } = useOutletContext<SetLayoutContext>();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setTitle(`Hello ${user?.name}!`);
    }
  }, [user]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={(
          <>
            <UserOutlined />
            {' '}
            Profile
          </>
        )}
        key="1"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6} lg={4}>
            <Row justify="center">
              <UserSettingsImageUpload user={user} />
            </Row>
          </Col>
          <Col xs={24} md={10} lg={10}>
            <UserSettingsEditUser user={user} />
          </Col>
          <Col xs={0} md={8} lg={10}>
            <UserSettingsMeta user={user} />
          </Col>
        </Row>
      </TabPane>
      <TabPane
        tab={(
          <>
            <LockOutlined />
            {' '}
            Password
          </>
        )}
        key="2"
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} md={8} lg={8}>
            <UserSettingsChangePassword />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default withProtectedRoute(withCleanLayoutVars(Settings));
