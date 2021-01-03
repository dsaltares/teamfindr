import React, { useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from '../../components/Page';
import VenueBasicInfoPanel from '../../components/VenueBasicInfoPanel';
import FutureEventsPanel from './FutureEventsPanel';
import { useVenue, useEvents } from '../../hooks';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const [date] = useState(new Date());
  const { venueId } = useParams<VenueRouteParams>();
  const { venue } = useVenue(venueId);
  const { events } = useEvents({ venue: venueId, after: date });

  return (
    <Page title={venue?.name}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <VenueBasicInfoPanel venue={venue} />
        </Grid>
        <Grid item xs={12} md={6}>
          {events ? (
            <FutureEventsPanel events={events} />
          ) : (
            <Skeleton width="100%" height="100%" variant="rect" />
          )}
        </Grid>
      </Grid>
    </Page>
  );
};

export default React.memo(Venue);
