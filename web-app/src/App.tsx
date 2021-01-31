import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
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
import Landing from './pages/Landing';

const App: React.FC = () => {
  useSubscribePush();
  const { isLoading } = useUser();

  if (isLoading) {
    return <Authenticating />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={withAuthentication(Home)} />
        <Route path="/events" exact component={withAuthentication(Events)} />
        <Route path="/events/:eventId" component={withAuthentication(Event)} />
        <Route path="/venues" exact component={withAuthentication(Venues)} />
        <Route path="/venues/:venueId" component={withAuthentication(Venue)} />
        <Route path="/settings" component={withAuthentication(Settings)} />
        <Route path="/login" exact component={withNoAuthentication(Landing)} />
        <Route path="/" exact component={withNoAuthentication(Landing)} />
      </Switch>
    </HashRouter>
  );
};

export default React.memo(App);
