import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../Home';
import Events from '../Events';
import Venues from '../Venues';
import Venue from '../Venue';
import Settings from '../Settings';

const Dashboard = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/home" />} />
    <Route path="/home" component={Home} />
    <Route path="/events" component={Events} />
    <Route path="/venues" exact component={Venues} />
    <Route path="/venues/:venueId" component={Venue} />
    <Route path="/settings" component={Settings} />
  </Switch>
);

export default React.memo(Dashboard);
