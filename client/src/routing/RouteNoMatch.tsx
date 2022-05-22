import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../pages/components/Layout';

export const RouteNoMatch: React.FC = () => {
  const { setLayoutProps } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setLayoutProps({
      title: 'Not found',
      menuKey: '99',
    });
  }, []);

  return <div>404</div>;
};
