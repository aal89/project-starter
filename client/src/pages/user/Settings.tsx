import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Col, Row, Tabs, Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { withProtectedRoute } from '../../enhancers/withProtectedRoute';
import { useMeQuery } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { UserSettingsChangePassword } from './components/UserSettingsChangePassword';
import { UserSettingsEditUser } from './components/UserSettingsEditUser';
import { UserSettingsImageUpload } from './components/UserSettingsImageUpload';
import { UserSettingsMeta } from './components/UserSettingsMeta';

const { Text } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { setTitle } = useOutletContext<SetLayoutContext>();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (data) {
      setTitle(`Hello ${data.me.name}!`);
    }
  }, [data]);

  if (!data) {
    return <Text>Failed to load user data</Text>;
  }

  if (loading) {
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
              <UserSettingsImageUpload user={data.me} />
            </Row>
          </Col>
          <Col xs={24} md={10} lg={10}>
            <UserSettingsEditUser user={data.me} />
          </Col>
          <Col xs={0} md={8} lg={10}>
            <UserSettingsMeta user={data.me} />
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
