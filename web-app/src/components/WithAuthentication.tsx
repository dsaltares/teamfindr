import React from 'react';
import { Redirect } from 'react-router';
import { auth } from '../store/hooks';

const Authenticating = () => <div>Authenticating</div>;

const WithAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props: P) => {
  console.log('Render WithAuthentication');
  const authenticated = auth.useAuthenticated();
  const authenticating = auth.useAuthenticating();

  if (authenticating) {
    return <Authenticating />;
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};

export default WithAuthentication;
