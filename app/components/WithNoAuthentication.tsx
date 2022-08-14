/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Redirect } from 'react-router';
import { useUser } from '@lib/hooks';

const WithNoAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  function WithNoAuthenticationWrapped(props: P) {
    const { user } = useUser();

    if (user) {
      return <Redirect to="/home" />;
    }

    return <Component {...props} />;
  }

  return WithNoAuthenticationWrapped;
};

export default WithNoAuthentication;
