import React, { useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import CancelIcon from '@material-ui/icons/Cancel';
import Page from '../../components/Page';
import EventBasicInfoPanel from './EventBasicInfoPanel';
import { useEvent, useShareEvent, useUser } from '../../hooks';
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

  return (
    <>
      <Page
        title={event?.canceledAt ? 'Canceled event' : 'Event'}
        titleActions={actions}
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
      <CancelEventDialog
        eventId={eventId}
        open={cancelDialogOpen}
        onClose={closeCancelDialog}
      />
    </>
  );
};

export default React.memo(EventPage);
