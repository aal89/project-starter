/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useLayoutVars } from '../hooks/layout-vars';

// eslint-disable-next-line max-len
export const withCleanLayoutVars = <P extends object>(Component: React.ComponentType<P>) => (props: P) => {
  const { setTitle, setMenuKey, setTitleContent } = useLayoutVars();

  useEffect(() => () => {
    setTitle('');
    setMenuKey('99');
    setTitleContent(<></>);
  }, []);

  return <Component {...props} />;
};
