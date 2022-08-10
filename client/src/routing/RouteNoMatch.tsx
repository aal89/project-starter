import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
import { SetLayoutContext } from '../pages/components/Layout';

export const RouteNoMatch: React.FC = withCleanLayoutVars(() => {
  const { setTitle } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle('Not found');
  }, []);

  return <div>404</div>;
});
