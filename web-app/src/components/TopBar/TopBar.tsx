import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';
import useStyles from './TopBar.styles';
import NavigationItem from './NavigationItem';
import AvatarMenu from './AvatarMenu';
import {
  pathnameToNavigationValue,
  navigationValueToRoute,
} from '../../utils/navigation';

const NavigationItems = [
  {
    value: 'home',
    text: 'Home',
    icon: HomeIcon,
  },
  {
    value: 'events',
    text: 'Events',
    icon: SportsSoccerIcon,
  },
  {
    value: 'venues',
    text: 'Venues',
    icon: LocationOnIcon,
  },
  {
    value: 'settings',
    text: 'Settings',
    icon: SettingsIcon,
  },
];

const TopBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const location = useLocation();

  if (!matches) {
    return null;
  }

  const navigationValue = pathnameToNavigationValue(location.pathname);

  return (
    <AppBar className={classes.topBar} position="static">
      <Toolbar>
        <Grid
          container
          className={classes.fullHeight}
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.fullHeight}>
            <Grid container className={classes.fullHeight} alignItems="center">
              <Grid item className={classes.titleContainer}>
                <Typography variant="h5">TeamFindr</Typography>
              </Grid>
              <Grid item className={classes.fullHeight}>
                <List className={classes.list} component="nav">
                  {NavigationItems.map((item) => (
                    <NavigationItem
                      key={item.value}
                      to={navigationValueToRoute(item.value)}
                      icon={item.icon}
                      text={item.text}
                      selected={navigationValue === item.value}
                    />
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.fullHeight}>
            <AvatarMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(TopBar);
