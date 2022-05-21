/* eslint-disable jsx-a11y/anchor-is-valid */
import { HomeTwoTone, UserOutlined } from '@ant-design/icons';
import {
  Typography, Avatar, Space, Row, Col, Dropdown, Menu,
} from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Text } = Typography;

const menu = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Settings
          </a>
        ),
        key: '0',
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Payment options
          </a>
        ),
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: 'Logout',
        key: '3',
        danger: true,
      },
    ]}
  />
);

const RightAlignCol = styled(Col)`
  text-align: right;
`;

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <Row>
    <Col span={2}>
      <Space>
        <HomeTwoTone />
        <Text strong>{title}</Text>
      </Space>
    </Col>
    <Col span={14}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `Example nav item ${key}`,
          };
        })}
      />
    </Col>
    <RightAlignCol span={8}>
      <a href="#" onClick={(e) => e.preventDefault()}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Space>
            <Text>User</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </a>
    </RightAlignCol>
  </Row>
);
