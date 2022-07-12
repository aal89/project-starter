import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../pages/components/Layout';

export const RouteNoMatch: React.FC = () => {
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Not found');
    setMenuKey('99');
  }, []);

  return <div>404</div>;
};
