import React, { useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import CancelIcon from '@material-ui/icons/Cancel';
import Page from '@components/Page';
import { useEvent, useShareEvent, useUser } from '@lib/hooks';
import EventBasicInfoPanel from './EventBasicInfoPanel';
import ParticipantsPanel from './ParticipantsPanel';
import CancelEventDialog from './CancelEventDialog';

interface EventRouteParams {
  eventId: string;
}
const EventPage = () => {
  const { eventId } = useParams<EventRouteParams>();
  const { event } = useEvent(eventId);
  const { user } = useUser();
  const shareEvent = useShareEvent(event);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const openCancelDialog = () => setCancelDialogOpen(true);
  const closeCancelDialog = () => setCancelDialogOpen(false);

  const isCreator = user && event && user.id === event.createdBy.id;
  const canCancel =
    isCreator &&
    event &&
    !event?.canceledAt &&
    event?.startsAt > new Date().toISOString();
  const actions = [
    ...(canCancel
      ? [
          {
            key: 'cancel',
            icon: <CancelIcon />,
            disabled: !event,
            onClick: openCancelDialog,
            danger: true,
          },
        ]
      : []),
    {
      key: 'share',
      icon: <ShareIcon />,
      disabled: !event,
      onClick: shareEvent,
    },
  ];

  const pageTitle = event?.canceledAt
    ? 'Canceled event'
    : event
    ? `${event.sport} event`
    : 'Event';

  return (
    <>
      <Page title={pageTitle} titleActions={actions}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={6}>
            <EventBasicInfoPanel event={event} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ParticipantsPanel eventId={eventId} />
          </Grid>
        </Grid>
      </Page>
      <CancelEventDialog
        eventId={eventId}
        open={cancelDialogOpen}
        onClose={closeCancelDialog}
      />
    </>
  );
};

export default React.memo(EventPage);
