import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
import { useLayoutVars } from '../hooks/layout-vars';

export const RouteNoMatch: React.FC = withCleanLayoutVars(() => {
  const intl = useIntl();
  const { setTitle } = useLayoutVars();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'Generic.NotFound' }));
  }, []);

  return <div>404</div>;
});
