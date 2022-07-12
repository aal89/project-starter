/* eslint-disable jsx-a11y/anchor-is-valid */
import { ControlTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Permission } from '@project-starter/shared/build';
import {
  Typography, Space, Row, Col, Menu, Button,
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
      <Col span={2}>
        <Space>
          <HomeTwoTone />
          <Text strong>{title}</Text>
        </Space>
      </Col>
      <Col span={16}>
        <Menu mode="horizontal" selectedKeys={[selectedKey]} items={navigation} />
      </Col>
      <RightAlignCol span={6}>
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
