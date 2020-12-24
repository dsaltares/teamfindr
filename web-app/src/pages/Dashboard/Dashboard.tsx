import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Redirect, Route, Switch } from 'react-router';
import Navigation from '../../components/Navigation';
import Home from '../Home';
import Events from '../Events';
import Venues from '../Venues';
import Settings from '../Settings';
import useStyles from './Dashboard.styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <Navigation />
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
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" exact component={Home} />
            <Route path="/events" exact component={Events} />
            <Route path="/venues" exact component={Venues} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Dashboard);
