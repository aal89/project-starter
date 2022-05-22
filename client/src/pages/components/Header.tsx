/* eslint-disable jsx-a11y/anchor-is-valid */
import { HomeTwoTone, UserOutlined } from '@ant-design/icons';
import {
  Typography, Avatar, Space, Row, Col, Dropdown, Menu,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { navigation } from './Navigation';
import { userMenu } from './UserMenu';

const { Text } = Typography;

const RightAlignCol = styled(Col)`
  text-align: right;
`;

type HeaderProps = {
  title: string;
  selectedKey: string;
};

export const Header: React.FC<HeaderProps> = ({ title, selectedKey }) => (
  <Row>
    <Col span={2}>
      <Space>
        <HomeTwoTone />
        <Text strong>{title}</Text>
      </Space>
    </Col>
    <Col span={14}>
      <Menu mode="horizontal" selectedKeys={[selectedKey]} items={navigation} />
    </Col>
    <RightAlignCol span={8}>
      <a href="#" onClick={(e) => e.preventDefault()}>
        <Dropdown overlay={<Menu items={userMenu} />} placement="bottomRight">
          <Space>
            <Text>User</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </a>
    </RightAlignCol>
  </Row>
);
