/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../pages/components/Layout';

// eslint-disable-next-line max-len
export const withCleanLayoutVars = <P extends object>(Component: React.ComponentType<P>) => (props: P) => {
  const { setTitle, setMenuKey, setTitleContent } = useOutletContext<SetLayoutContext>();

  useEffect(() => () => {
    setTitle('');
    setMenuKey('99');
    setTitleContent(<></>);
  }, []);

  return <Component {...props} />;
};
