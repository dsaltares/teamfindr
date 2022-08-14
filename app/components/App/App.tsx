import '@fontsource/poppins';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import Providers from '@components/providers';
import Routes from '@components/Routes';
import WebsitePolicies from '@components/WebsitePolicies';

const App: React.FC = () => (
  <React.StrictMode>
    <Head>
      <title>TeamFindr</title>
    </Head>
    <WebsitePolicies />
    <Providers>
      <CssBaseline />
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  </React.StrictMode>
);

export default React.memo(App);
