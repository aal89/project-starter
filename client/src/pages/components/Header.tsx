import { HomeTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import styled from 'styled-components';
import React from 'react';

const { Text } = Typography;

const HomeTwoToneWithMargin = styled(HomeTwoTone)`
  margin-right: 5px;
`;

type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <>
    <HomeTwoToneWithMargin />
    <Text strong>{title}</Text>
  </>
);
