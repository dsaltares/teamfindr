import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Authenticating from './pages/Authenticating';
import withAuthentication from './components/WithAuthentication';
import withNoAuthentication from './components/WithNoAuthentication';
import { auth } from './store/hooks';

function App() {
  const authenticate = auth.useAuthenticate();
  const authenticating = auth.useAuthenticating();

  useEffect(() => authenticate(), [authenticate]);

  if (authenticating) {
    return <Authenticating />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={withNoAuthentication(Login)} />
        <Route path="/" component={withAuthentication(Home)} />
      </Switch>
    </HashRouter>
  );
}

export default React.memo(App);
