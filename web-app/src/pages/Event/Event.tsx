import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useParams } from 'react-router';
import Page from '../../components/Page';
import EventBasicInfoPanel from './EventBasicInfoPanel';
import { useEvent } from '../../hooks';
import ParticipantsPanel from './ParticipantsPanel';

interface EventRouteParams {
  eventId: string;
}

const Event = () => {
  const { eventId } = useParams<EventRouteParams>();
  const { event } = useEvent(eventId);

  return (
    <Page title="Event">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <EventBasicInfoPanel event={event} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ParticipantsPanel eventId={eventId} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default React.memo(Event);
