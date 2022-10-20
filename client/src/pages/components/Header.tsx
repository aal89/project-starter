/* eslint-disable jsx-a11y/anchor-is-valid */
import { HomeTwoTone } from '@ant-design/icons';
import {
  Typography, Row, Col, Menu, Space,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
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
  <Row wrap={false}>
    <Col>
      <Link to="/">
        <Space>
          <HomeTwoTone />
          <Text strong>
            {title}
          </Text>
        </Space>
      </Link>
    </Col>
    <Col flex="auto">
      <Menu mode="horizontal" selectedKeys={[selectedKey]} items={navigation} />
    </Col>
    <RightAlignCol flex="50px">
      <a href="#" onClick={(e) => e.preventDefault()}>
        <User />
      </a>
    </RightAlignCol>
  </Row>
);
