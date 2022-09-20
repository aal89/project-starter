import {
  Row, Col, Card, Statistic,
} from 'antd';
import React from 'react';
import { useStatsQuery } from '../../../graphql/generated/graphql';

export const Stats: React.FC = () => {
  const { data, loading } = useStatsQuery();

  const totalUsers = data?.stats.totalUsers ?? 0;
  const activeUsers = data?.stats.activeUsers ?? 0;
  const recentlyCreatedUsers = data?.stats.recentlyCreatedUsers ?? 0;

  const conversionRate = () => {
    const conversion = (activeUsers / totalUsers) * 100;

    if (Number.isNaN(conversion)) {
      return 0;
    }

    return conversion;
  };

  return (
    <Row justify="center" gutter={18}>
      <Col>
        <Card>
          <Statistic title="Total Users" value={totalUsers} loading={loading} />
        </Card>
      </Col>
      <Col>
        <Card>
          <Statistic title="Active Users" value={activeUsers} loading={loading} />
        </Card>
      </Col>
      <Col>
        <Card>
          <Statistic title="Created today" value={recentlyCreatedUsers} loading={loading} />
        </Card>
      </Col>
      <Col>
        <Card>
          <Statistic
            title="Conversion rate (Active user)"
            value={`${conversionRate().toFixed(2)}%`}
          />
        </Card>
      </Col>
    </Row>
  );
};
