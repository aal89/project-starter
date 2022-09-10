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
import { UserSettingsTitle } from './components/UserSettingsTitle';

const { Text } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { setTitle, setTitleContent } = useOutletContext<SetLayoutContext>();
  const { data: user, loading } = useMeQuery();

  useEffect(() => {
    if (user) {
      setTitle(`Hello ${user.me.name}!`);
      setTitleContent(<UserSettingsTitle user={user.me} />);
    }
  }, [user]);

  if (!user) {
    return <Text>Failed to load user data</Text>;
  }

  if (loading) {
    return <Spinner />;
  }

  console.log(user.me.name);

  return (
    <Tabs defaultActiveKey="1" size="small" tabPosition="left">
      <TabPane
        tab={(
          <>
            <UserOutlined />
            {' '}
            Edit user
          </>
        )}
        key="1"
      >
        <Row gutter={[24, 0]}>
          <Col flex="none">
            <UserSettingsImageUpload />
          </Col>
          <Col span={8}>
            <UserSettingsEditUser user={user.me} />
          </Col>
          <Col flex="auto">{user && <UserSettingsMeta user={user.me} />}</Col>
        </Row>
      </TabPane>
      <TabPane
        tab={(
          <>
            <LockOutlined />
            Change password
          </>
        )}
        key="2"
      >
        <Row gutter={[24, 0]}>
          <Col span={8}>
            <UserSettingsChangePassword />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default withProtectedRoute(withCleanLayoutVars(Settings));
