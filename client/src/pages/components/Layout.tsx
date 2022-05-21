import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';
import config from '../../config';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutContext = {
  title?: string;
};

export type SetLayoutContext = {
  setLayoutProps: Dispatch<SetStateAction<LayoutContext>>;
};

export const Layout: React.FC = () => {
  const [layoutProps, setLayoutProps] = useState<LayoutContext>({});

  return (
    <ProLayout
      disableMobile
      headerContentRender={() => <Header title={config.projectName} />}
      menuRender={false}
    >
      <PageContainer title={layoutProps.title} footer={[<Footer />]}>
        <Outlet context={{ setLayoutProps }} />
      </PageContainer>
    </ProLayout>
  );
};
