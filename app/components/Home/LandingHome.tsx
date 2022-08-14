import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Page from '@components/Page';
import useStyles from './LandingHome.styles';
import SportButton from './SportButton';

const LandingHome = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page fullScreen>
      <div
        className={clsx(
          classes.container,
          isSmallScreen ? classes.mobileContainer : classes.desktopContainer
        )}
      >
        <div className={classes.textContainer}>
          {isSmallScreen && (
            <div className={classes.appNameContainer}>
              <Typography variant="body1">TeamFindr</Typography>
            </div>
          )}
          <div className={classes.tagLineContainer}>
            <Typography
              className={classes.titleMedium}
              variant="h2"
              component="div"
            >
              <div className={classes.bold}>Join sport events</div>
            </Typography>
            <Typography
              className={classes.titleLarge}
              variant="h2"
              component="div"
            >
              <div className={classes.bold}>around you.</div>
            </Typography>
          </div>
          <Typography className={classes.tagLine} variant="h5" component="div">
            <div className={classes.semiBold}>
              What do you want to play today?
            </div>
          </Typography>
        </div>
        <div className={classes.sportsContainer}>
          <Grid container spacing={1}>
            <Grid item xs={4} md={2}>
              <SportButton sport="Football" />
            </Grid>
            <Grid item xs={4} md={2}>
              <SportButton sport="Basketball" />
            </Grid>
            <Grid item xs={4} md={2}>
              <SportButton sport="Handball" />
            </Grid>
            <Hidden smDown>
              <Grid item xs={4} md={2}>
                <SportButton sport="Volleyball" />
              </Grid>
              <Grid item xs={4} md={2}>
                <SportButton sport="Squash" />
              </Grid>
              <Grid item xs={4} md={2}>
                <SportButton sport="Tennis" />
              </Grid>
            </Hidden>
          </Grid>
        </div>
        <div className={classes.seeAllContainer}>
          <Button
            component={Link}
            to="/events"
            variant="text"
            color="inherit"
            endIcon={<ArrowRightAltIcon />}
          >
            See all sports
          </Button>
        </div>
        <div>
          <Button
            className={classes.loginButton}
            component={Link}
            to="/login"
            variant="outlined"
            color="inherit"
            fullWidth
          >
            Join TeamFindr
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default React.memo(LandingHome);
