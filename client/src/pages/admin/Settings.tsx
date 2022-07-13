import { UserOutlined } from '@ant-design/icons';
import {
  Card, Col, Divider, Input, message, Pagination, Row, Statistic, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery, User } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { EditUserModal } from './EditUserModal';
import { columns } from './settingsColumnType';

const Settings: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();
  const [action, setAction] = useState<{
    action: 'edit' | 'reset' | 'restrict' | 'delete';
    user: User;
  } | null>(null);
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useGetUsersQuery({
    variables: {
      offset,
      limit: 25,
    },
  });

  useEffect(() => {
    setTitle('Administrator');
    setMenuKey('99');
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  const updateUser = (user: User) => {
    console.log('asdf');
    if (data) {
      data.users.users[data.users.users.findIndex((u) => u.id === user.id)] = user;
    }
    setAction(null);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {action && action.action === 'edit' && (
        <EditUserModal user={action.user} onClose={updateUser} />
      )}
      <Row justify="center" gutter={18}>
        <Col>
          <Card>
            <Statistic title="Total Users" value={2875} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic title="Active Users" value={488} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic title="Created in last 24 hrs" value={32} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Conversion rate (Active user)"
              value={`${((488 / 2875) * 100).toFixed(2)}%`}
            />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">User management</Divider>
      <Row style={{ marginBottom: 10 }}>
        <Col span={6}>
          <Input
            size="large"
            placeholder="Search by username..."
            allowClear
            prefix={<UserOutlined />}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns({
              editUser: (user: User) => setAction({ action: 'edit', user }),
            })}
            dataSource={data?.users.users.map((u) => ({ key: u.id, ...u }))}
            pagination={false}
            locale={{
              emptyText: 'No data',
            }}
          />
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: 10 }}>
        <Col>
          <Pagination
            pageSize={25}
            current={offset + 1}
            total={data?.users.total}
            onChange={(page) => setOffset(page - 1)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Settings;
