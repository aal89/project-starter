import { UserOutlined } from '@ant-design/icons';
import {
  Divider, Row, Col, Input, Table, Empty, Pagination, message, Skeleton,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../../graphql/generated/graphql';
import { columns } from '../columns';

const PAGE_SIZE = 25;

export const ListUsersTable: React.FC = () => {
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

  return (
    <>
      <Divider orientation="left">User management</Divider>
      <Skeleton loading={loading} active round title={false} paragraph={{ rows: 10 }}>
        <Row style={{ marginBottom: 10 }}>
          <Col xs={24} md={12} lg={8}>
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
      </Skeleton>
    </>
  );
};
