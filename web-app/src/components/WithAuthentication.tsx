/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../queries';

const WithAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props: P) => {
  const user = useUser();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};

export default WithAuthentication;
