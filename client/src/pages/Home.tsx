import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
import { useLayoutVars } from '../hooks/layout-vars';

const { Text } = Typography;

const Home: React.FC = () => {
  const intl = useIntl();
  const { setTitle, setMenuKey } = useLayoutVars();

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'Home.Title' }));
    setMenuKey('0');
  }, []);

  return (
    <>
      <Text>
        <FormattedMessage id="Home.Text" />
      </Text>
    </>
  );
};

export default withCleanLayoutVars(Home);
