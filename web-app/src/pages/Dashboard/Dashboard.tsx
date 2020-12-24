import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from 'react-router';
import TopBar from '../../components/TopBar';
import Home from '../Home';
import Events from '../Events';
import Venues from '../Venues';
import Settings from '../Settings';
import BottomNavigation from '../../components/BottomNavigation';
import useStyles from './Dashboard.styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <TopBar />
      <Grid
        className={classes.root}
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/events" exact component={Events} />
            <Route path="/venues" exact component={Venues} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
        </Grid>
      </Grid>
      <BottomNavigation />
    </div>
  );
};

export default React.memo(Dashboard);
