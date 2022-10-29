import {
  Row, Col, Statistic,
} from 'antd';
import React from 'react';
import { useStatsQuery } from '../../../graphql/generated/graphql';

export const Stats: React.FC = () => {
  const { data, loading } = useStatsQuery();

  const totalUsers = data?.totalUsers ?? 0;
  const activeUsers = data?.activeUsers ?? 0;
  const recentlyCreatedUsers = data?.recentlyCreatedUsers ?? 0;

  const conversionRate = () => {
    const conversion = (activeUsers / totalUsers) * 100;

    if (Number.isNaN(conversion)) {
      return 0;
    }

    return conversion;
  };

  return (
    <Row justify="center" gutter={[18, 18]}>
      <Col>
        <Statistic title="Total Users" value={totalUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic title="Active Users" value={activeUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic title="Created today" value={recentlyCreatedUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic
          title="Conversion rate (Active user)"
          value={`${conversionRate().toFixed(2)}%`}
        />
      </Col>
    </Row>
  );
};
