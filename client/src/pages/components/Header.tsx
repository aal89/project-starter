/* eslint-disable jsx-a11y/anchor-is-valid */
import { HomeTwoTone } from '@ant-design/icons';
import {
  Typography, Space, Row, Col, Menu,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { navigation } from './navigation/NavigationItems';
import { User } from './navigation/User';

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
        <User />
      </a>
    </RightAlignCol>
  </Row>
);
