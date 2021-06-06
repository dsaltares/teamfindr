import React from 'react';
import LandingHome from './LandingHome';
import LoggedInHome from './LoggedInHome';
import { useUser } from '../../hooks';

const Home = () => {
  const { user } = useUser();

  return !!user ? <LoggedInHome /> : <LandingHome />;
};

export default React.memo(Home);
