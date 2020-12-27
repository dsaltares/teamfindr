/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../hooks';

const WithNoAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props: P) => {
  const { user } = useUser();

  if (user) {
    return <Redirect to="/" />;
  }

  return <Component {...props} />;
};

export default WithNoAuthentication;
