/* eslint-disable jsx-a11y/anchor-is-valid */
import { ControlTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Permission } from '@project-starter/shared/build';
import {
  Typography, Row, Col, Menu, Button,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { Path } from '../../routing/Path';
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

export const Header: React.FC<HeaderProps> = ({ title, selectedKey }) => {
  const { userCan } = useAuth();
  const navigate = useNavigate();

  return (
    <Row>
      <Col span={1}>
        <HomeTwoTone />
      </Col>
      <Col xs={0} md={2}>
        <Text ellipsis strong>{title}</Text>
      </Col>
      <Col xs={17} md={15}>
        <Menu mode="horizontal" selectedKeys={[selectedKey]} items={navigation} />
      </Col>
      <RightAlignCol xs={6} md={6}>
        {userCan(Permission.ADMINISTRATE) && (
          <Button type="link" icon={<ControlTwoTone />} onClick={() => navigate(Path.adminSettings)}>
            Admin
          </Button>
        )}
        <a href="#" onClick={(e) => e.preventDefault()}>
          <User />
        </a>
      </RightAlignCol>
    </Row>
  );
};
