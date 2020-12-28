import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Authenticating from './pages/Authenticating';
import withAuthentication from './components/WithAuthentication';
import withNoAuthentication from './components/WithNoAuthentication';
import { useUser, usePrefetch } from './hooks';

function App() {
  usePrefetch();
  const { isLoading } = useUser();

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
