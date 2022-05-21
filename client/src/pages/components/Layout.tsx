import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';
import config from '../../config';
import { Header } from './Header';

const { Text } = Typography;

type LayoutContext = {
  title?: string;
};

export type SetLayoutContext = {
  setLayoutProps: Dispatch<SetStateAction<LayoutContext>>;
};

const Footer = () => (
  <Text>
    &copy;2022&nbsp;-&nbsp;
    {config.projectName}
  </Text>
);

export const Layout: React.FC = () => {
  const [layoutProps, setLayoutProps] = useState<LayoutContext>({});

  return (
    <ProLayout headerContentRender={() => <Header title={config.projectName} />} menuRender={false}>
      <PageContainer title={layoutProps.title} footer={[<Footer />]}>
        <Outlet context={{ setLayoutProps }} />
      </PageContainer>
    </ProLayout>
  );
};
