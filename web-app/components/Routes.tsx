import React from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import Authenticating from '@components/Authenticating';
import withAuthentication from '@components/WithAuthentication';
import withNoAuthentication from '@components/WithNoAuthentication';
import { useUser } from '@lib/hooks';
import Home from '@components/Home';
import Events from '@components/Events';
import Event from '@components/Event';
import Venues from '@components/Venues';
import Venue from '@components/Venue';
import Settings from '@components/Settings';
import Login from '@components/Login';
import NotFound from '@components/NotFound';
import PageTracker from '@components/PageTracker';

const Routes: React.FC = () => {
  const { user, isLoading } = useUser();

  if (!user && isLoading) {
    return <Authenticating />;
  }

  return (
    <HashRouter>
      <PageTracker />
      <Switch>
        <Route path="/_=_" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/events" exact component={Events} />
        <Route path="/events/:eventId" component={Event} />
        <Route path="/venues" exact component={Venues} />
        <Route path="/venues/:venueId" component={Venue} />
        <Route path="/settings" component={withAuthentication(Settings)} />
        <Route path="/login" exact component={withNoAuthentication(Login)} />
        <Route exact component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default React.memo(Routes);
