import React, { useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import ShareIcon from '@material-ui/icons/Share';
import Page from '../../components/Page';
import VenueBasicInfoPanel from '../../components/VenueBasicInfoPanel';
import FutureEventsPanel from './FutureEventsPanel';
import { useVenue, useEvents, useShareVenue } from '../../hooks';
import NoResults from '../../components/NoResults';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const [date] = useState(new Date());
  const { venueId } = useParams<VenueRouteParams>();
  const { venue } = useVenue(venueId);
  const { events } = useEvents({ venue: venueId, after: date });
  const shareVenue = useShareVenue(venue);

  let eventContent = null;
  if (!events) {
    eventContent = <Skeleton width="100%" height="100%" variant="rect" />;
  } else {
    eventContent =
      events.length > 0 ? (
        <FutureEventsPanel events={events} />
      ) : (
        <NoResults primaryText="No upcoming events." width="300" height="250" />
      );
  }

  return (
    <Page
      title={venue?.name}
      titleActions={[
        {
          key: 'share',
          icon: <ShareIcon />,
          disabled: !venue,
          onClick: shareVenue,
        },
      ]}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <VenueBasicInfoPanel venue={venue} />
        </Grid>
        <Grid item xs={12} md={6}>
          {eventContent}
        </Grid>
      </Grid>
    </Page>
  );
};

export default React.memo(Venue);
