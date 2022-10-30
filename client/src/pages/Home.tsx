import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useOutletContext } from 'react-router-dom';
import { withCleanLayoutVars } from '../enhancers/withCleanLayoutVars';
import { SetLayoutContext } from './components/Layout';

const { Text } = Typography;

const Home: React.FC = () => {
  const intl = useIntl();
  const { setTitle, setMenuKey } = useOutletContext<SetLayoutContext>();

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
