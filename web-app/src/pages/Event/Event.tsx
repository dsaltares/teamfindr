import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useParams } from 'react-router';
import ShareIcon from '@material-ui/icons/Share';
import Page from '../../components/Page';
import EventBasicInfoPanel from './EventBasicInfoPanel';
import { useEvent, useShareEvent } from '../../hooks';
import ParticipantsPanel from './ParticipantsPanel';

interface EventRouteParams {
  eventId: string;
}
const EventPage = () => {
  const { eventId } = useParams<EventRouteParams>();
  const { event } = useEvent(eventId);
  const shareEvent = useShareEvent(event);

  return (
    <Page
      title="Event"
      titleActions={[
        {
          key: 'share',
          icon: <ShareIcon />,
          disabled: !event,
          onClick: shareEvent,
        },
      ]}
    >
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

export default React.memo(EventPage);
