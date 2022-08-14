/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Redirect } from 'react-router';
import { useUser } from '@lib/hooks';

const WithAuthentication = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  function WithAuthenticationWrapped(props: P) {
    const { user } = useUser();

    if (!user) {
      return (
        <Redirect
          to={`/login?redirect=${encodeURIComponent(window.location.href)}`}
        />
      );
    }

    return <Component {...props} />;
  }

  return WithAuthenticationWrapped;
};

export default WithAuthentication;
