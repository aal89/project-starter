import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Col, Row, Tabs,
} from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { useAuth } from '../../hooks/auth';
import { useLayoutVars } from '../../hooks/layout-vars';
import { Spinner } from '../components/Spinner';
import { UserSettingsChangePassword } from './components/UserSettingsChangePassword';
import { UserSettingsEditUser } from './components/UserSettingsEditUser';
import { UserSettingsImageUpload } from './components/UserSettingsImageUpload';
import { UserSettingsMeta } from './components/UserSettingsMeta';

const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const { user } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    if (user) {
      setTitle(intl.formatMessage({ id: 'Settings.Title' }, { username: user?.name }));
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
            <FormattedMessage id="Settings.Profile.Tab" />
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
            <FormattedMessage id="Settings.Password.Tab" />
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
