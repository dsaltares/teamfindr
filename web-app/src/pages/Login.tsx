import React from 'react';
import { auth } from '../store/hooks';

function Login() {
  const loginViaSocialMedia = auth.useLoginViaSocialMedia();

  return (
    <ul>
      <li onClick={() => loginViaSocialMedia('twitter')}>Login via Twitter</li>
      <li onClick={() => loginViaSocialMedia('facebook')}>
        Login via Facebook
      </li>
      <li onClick={() => loginViaSocialMedia('google')}>Login via Google</li>
    </ul>
  );
}

export default React.memo(Login);
