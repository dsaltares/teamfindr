import React from 'react';
import { auth } from '../store/hooks';

const Home = () => {
  const logout = auth.useLogout();

  return (
    <div>
      <div>Home</div>
      <div onClick={() => logout()}>Logout</div>
    </div>
  );
};

export default React.memo(Home);
