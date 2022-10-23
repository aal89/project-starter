import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export type SetLayoutContext = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMenuKey: React.Dispatch<React.SetStateAction<string>>;
  setTitleContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

export const Layout: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [menuKey, setMenuKey] = useState<string>('99');
  const [titleContent, setTitleContent] = useState<React.ReactNode>(<></>);

  return (
    <ProLayout
      disableMobile
      headerContentRender={() => (
        <Header title={process.env.REACT_APP_PROJECT_NAME ?? ''} selectedKey={menuKey} />
      )}
      menuRender={false}
    >
      <PageContainer title={title} content={titleContent} footer={[<Footer key={0} />]}>
        <div style={{ marginTop: '-25px' }}>
          <Outlet context={{ setTitle, setMenuKey, setTitleContent }} />
        </div>
      </PageContainer>
    </ProLayout>
  );
};
