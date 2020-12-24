import React from 'react';
import { Redirect } from 'react-router';
import { auth } from '../store';

const WithAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props: P) => {
  const authenticated = auth.useAuthenticated();

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};

export default WithAuthentication;
