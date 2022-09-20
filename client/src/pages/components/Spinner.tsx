import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = (size: number) => <LoadingOutlined style={{ fontSize: size }} />;

type SpinnerProps = {
  tip?: string;
  size?: number;
  enabled?: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({
  tip, size = 24, enabled = true, children,
}) => (
  <Spin tip={tip} indicator={antIcon(size)} spinning={enabled}>
    {children}
  </Spin>
);
