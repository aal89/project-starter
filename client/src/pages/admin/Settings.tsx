import { UserOutlined } from '@ant-design/icons';
import { decode as decodePermissions } from '@project-starter/shared/build';
import {
  Card,
  Col,
  Divider,
  Input,
  message,
  Pagination,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery, User } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';

const { Text } = Typography;

const Settings: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useGetUsersQuery({
    variables: {
      offset,
      limit: 25,
    },
  });

  const columns: ColumnsType<User & { key: string }> = [
    {
      title: 'Identifier',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      render: (text) => (
        <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => text ?? '-',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => text,
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (text) => decodePermissions(text).map((e) => <Tag key={e}>{e}</Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Space size="middle">Reset password Restrict access Delete</Space>,
    },
  ];

  useEffect(() => {
    setTitle('Administrator');
    setMenuKey('99');
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
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
            <Statistic title="Conversion rate (Active user)" value={`${((488 / 2875) * 100).toFixed(2)}%`} />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">User management</Divider>
      <Row style={{ marginBottom: 10 }}>
        <Col span={6}>
          <Input size="large" placeholder="Search by username..." allowClear prefix={<UserOutlined />} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data?.users.users.map((u) => ({ key: u.id, ...u }))}
            pagination={false}
            locale={{
              emptyText: 'No data',
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
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
