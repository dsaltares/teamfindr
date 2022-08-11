import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Image from 'next/image';
import AvatarMenu from '../../AvatarMenu/AvatarMenu';
import NavigationItems from '../navigationItems';
import { useUser } from '@lib/hooks';
import useStyles from './DesktopNavigation.styles';

const DesktopNavigation = () => {
  const { user } = useUser();
  const classes = useStyles();
  const location = useLocation();
  const selectedValue = location.pathname.split('/')[1];

  return (
    <>
      <AppBar className={classes.topBar} position="fixed">
        <Toolbar>
          <Grid
            container
            className={classes.fullHeight}
            justify="space-between"
            alignItems="center"
          >
            <Grid item className={classes.fullHeight}>
              <Grid
                container
                className={classes.fullHeight}
                alignItems="center"
              >
                <Grid item className={classes.logo}>
                  <Link to="/">
                    <Image
                      aria-hidden="true"
                      alt=""
                      src="/logo_simple.svg"
                      width={40}
                      height={40}
                    />
                  </Link>
                </Grid>
                <Grid item className={classes.titleContainer}>
                  <Typography variant="h5">TeamFindr</Typography>
                </Grid>
                <Grid item className={classes.fullHeight}>
                  <List className={classes.list} component="nav">
                    {NavigationItems.map(
                      (item) =>
                        (!item.loggedInOnly || !!user) && (
                          <ListItem
                            key={item.value}
                            className={classes.item}
                            selected={item.value === selectedValue}
                            button
                            component={Link}
                            to={`/${item.value}`}
                          >
                            <ListItemIcon className={classes.icon}>
                              <item.icon />
                            </ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                          </ListItem>
                        )
                    )}
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
      <Toolbar disableGutters className={classes.filler} />
    </>
  );
};

export default React.memo(DesktopNavigation);
