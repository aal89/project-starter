import {
  Row, Col, Statistic,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStatsQuery } from '../../../graphql/generated/graphql';

export const Stats: React.FC = () => {
  const { data, loading } = useStatsQuery();
  const intl = useIntl();

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
        <Statistic title={intl.formatMessage({ id: 'Admin.Stats.Users.Total' })} value={totalUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic title={intl.formatMessage({ id: 'Admin.Stats.Users.Active' })} value={activeUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic title={intl.formatMessage({ id: 'Admin.Stats.Users.Created' })} value={recentlyCreatedUsers} loading={loading} />
      </Col>
      <Col>
        <Statistic
          title={intl.formatMessage({ id: 'Admin.Stats.Users.Converted' })}
          value={`${conversionRate().toFixed(2)}%`}
        />
      </Col>
    </Row>
  );
};
