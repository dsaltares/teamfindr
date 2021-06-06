import './App.css';
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Authenticating from './pages/Authenticating';
import withAuthentication from './components/WithAuthentication';
import withNoAuthentication from './components/WithNoAuthentication';
import { useUser, useSubscribePush } from './hooks';
import Home from './pages/Home';
import Events from './pages/Events';
import Event from './pages/Event';
import Venues from './pages/Venues';
import Venue from './pages/Venue';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PageTracker from './components/PageTracker';

const App: React.FC = () => {
  useSubscribePush();
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

export default React.memo(App);
