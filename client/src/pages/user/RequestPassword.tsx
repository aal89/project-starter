import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../../enhancers/withCleanLayoutVars';
import { useLayoutVars } from '../../hooks/layout-vars';

const RequestPassword: React.FC = () => {
  const { setTitle } = useLayoutVars();
  const intl = useIntl();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'RequestPassword.Title' }));
  }, []);

  return <>Request password</>;
};

export default withCleanLayoutVars(RequestPassword);
