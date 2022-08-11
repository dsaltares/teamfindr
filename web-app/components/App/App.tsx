import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools';
import Providers from '@components/providers';
import Routes from '@components/Routes';

const App: React.FC = () => (
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  </React.StrictMode>
);

export default React.memo(App);
