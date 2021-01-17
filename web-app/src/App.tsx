import './App.css';
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Authenticating from './pages/Authenticating';
import withAuthentication from './components/WithAuthentication';
import withNoAuthentication from './components/WithNoAuthentication';
import { useUser, usePrefetch } from './hooks';
import subscribeToPushNotifications from './utils/subscribeToPushNotifications';

function App() {
  usePrefetch();
  const { isLoading, pushPublicKey } = useUser();

  useEffect(() => {
    if (pushPublicKey) {
      subscribeToPushNotifications(pushPublicKey);
    }
  }, [pushPublicKey]);

  if (isLoading) {
    return <Authenticating />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={withNoAuthentication(Login)} />
        <Route path="/" component={withAuthentication(Dashboard)} />
      </Switch>
    </HashRouter>
  );
}

export default React.memo(App);
