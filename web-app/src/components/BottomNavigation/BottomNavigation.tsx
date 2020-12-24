import React from 'react';
import BottomNavigationBase from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './BottomNavigation.styles';
import {
  pathnameToNavigationValue,
  navigationValueToRoute,
} from '../../utils/navigation';

const BottomNavigation = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const navigationValue = pathnameToNavigationValue(location.pathname);
  const handleNavigationChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    history.push(navigationValueToRoute(value));
  };

  if (!matches) {
    return null;
  }

  return (
    <BottomNavigationBase
      className={classes.navigation}
      value={navigationValue}
      onChange={handleNavigationChange}
    >
      <BottomNavigationAction value="home" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        value="events"
        label="Events"
        icon={<SportsSoccerIcon />}
      />
      <BottomNavigationAction
        value="venues"
        label="Venues"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        value="settings"
        label="Settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigationBase>
  );
};

export default React.memo(BottomNavigation);
