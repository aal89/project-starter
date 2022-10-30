import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
import { SetLayoutContext } from '../pages/components/Layout';

export const RouteNoMatch: React.FC = withCleanLayoutVars(() => {
  const intl = useIntl();
  const { setTitle } = useOutletContext<SetLayoutContext>();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'Generic.NotFound' }));
  }, []);

  return <div>404</div>;
});
