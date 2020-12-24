import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';

import NavigationItems from './navigationItems';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

const Navigation = () => {
  const theme = useTheme();
  const desktopMode = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const value = location.pathname.split('/')[1];

  const NavigationComponent = desktopMode
    ? DesktopNavigation
    : MobileNavigation;
  return <NavigationComponent selectedValue={value} items={NavigationItems} />;
};

export default React.memo(Navigation);
