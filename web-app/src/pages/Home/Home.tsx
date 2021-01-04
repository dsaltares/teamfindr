import React from 'react';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import UserInfoPanel from './UserInfoPanel';
import UserEventsPanel from './UserEventsPanel';

const Home = () => (
  <Page title="Home">
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12} md={6}>
        <UserInfoPanel />
      </Grid>
      <Grid item xs={12} md={6}>
        <UserEventsPanel />
      </Grid>
    </Grid>
  </Page>
);

export default React.memo(Home);
