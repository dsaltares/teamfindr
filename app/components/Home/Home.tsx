import React from 'react';
import { useUser } from '@lib/hooks';
import LandingHome from './LandingHome';
import LoggedInHome from './LoggedInHome';

const Home = () => {
  const { user } = useUser();

  return !!user ? <LoggedInHome /> : <LandingHome />;
};

export default React.memo(Home);
