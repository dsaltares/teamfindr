import React from 'react';
import { Redirect } from 'react-router';
import { auth } from '../store/hooks';

const WithNoAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props: P) => {
  const authenticated = auth.useAuthenticated();

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return <Component {...props} />;
};

export default WithNoAuthentication;
