import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = (size: number) => <LoadingOutlined style={{ fontSize: size }} />;

type SpinnerProps = {
  tip?: string;
  size?: number
};

export const Spinner: React.FC<SpinnerProps> = ({ tip, size = 24, children }) => (
  <Spin tip={tip} indicator={antIcon(size)}>
    {children}
  </Spin>
);
