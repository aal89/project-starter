import { UserOutlined } from '@ant-design/icons';
import {
  Card, Col, Divider, Empty, Input, message, Pagination, Row, Statistic, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery } from '../../graphql/generated/graphql';
import { SetLayoutContext } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { columns } from './columns';

const PAGE_SIZE = 25;

const Settings: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const {
    data, loading, error, refetch,
  } = useGetUsersQuery({
    fetchPolicy: 'no-cache',
    variables: {
      offset: 0,
      limit: PAGE_SIZE,
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

  const searchHandler = (text: string) => {
    if (text.length > 3) {
      setIsSearching(true);
      refetch({
        offset: 0,
        username: text,
      });
    }
    if (text.length === 0) {
      setIsSearching(false);
      setCurrentSearchPage(1);
      refetch({
        offset: currentPage * PAGE_SIZE - PAGE_SIZE,
        username: null,
      });
    }
  };

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
            onChange={(event) => searchHandler(event.target.value)}
            prefix={<UserOutlined />}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns({
              dataChanged() {
                refetch();
              },
            })}
            dataSource={data?.users.users.map((u) => ({ key: u.id, ...u }))}
            pagination={false}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data" />,
            }}
          />
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: 10 }}>
        <Col>
          <Pagination
            pageSize={PAGE_SIZE}
            current={isSearching ? currentSearchPage : currentPage}
            total={data?.users.total}
            onChange={(page) => {
              if (isSearching) {
                setCurrentSearchPage(page);
              }
              if (!isSearching) {
                setCurrentPage(page);
              }
              refetch({
                offset: page * PAGE_SIZE - PAGE_SIZE,
              });
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Settings;
