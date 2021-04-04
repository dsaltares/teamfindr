import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import Divider from '@material-ui/core/Divider';

import ParticipantTable from './ParticipantTable';
import {
  useEvent,
  useUser,
  useParticipants,
  useAddParticipant,
  useRemoveParticipant,
  useEnablePushSnackbar,
} from '../../hooks';
import useStyles from './ParticipantsPanel.styles';
import ToggleParticipationButton from './ToggleParticipationButton';

interface ParticipantsPanelProps {
  eventId: string;
}

const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({ eventId }) => {
  const classes = useStyles();
  const { event } = useEvent(eventId);
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const enqueueEnablePushSnackbar = useEnablePushSnackbar();
  const { participants, isLoading: loadingParticipants } = useParticipants(
    eventId
  );
  const addParticipant = useAddParticipant();
  const removeParticipant = useRemoveParticipant();
  const isFull = !!event && event.numParticipants >= event.capacity;
  const isParticipant =
    !!participants &&
    !!user &&
    !!participants.find((p) => p.user.id === user.id);
  const isPast = Boolean(event && event.startsAt < new Date().toISOString());
  const isCanceled = !!event?.canceledAt;
  const capacityMsg = event
    ? ` (${event.numParticipants}/${event.capacity})`
    : '';

  useEffect(() => {
    if (addParticipant.isSuccess) {
      enqueueSnackbar('Joined event!', { variant: 'success' });
      enqueueEnablePushSnackbar();
    }
    if (addParticipant.isError) {
      enqueueSnackbar('Failed to join event', { variant: 'error' });
    }
  }, [
    enqueueSnackbar,
    enqueueEnablePushSnackbar,
    addParticipant.isSuccess,
    addParticipant.isError,
  ]);

  useEffect(() => {
    if (removeParticipant.isSuccess) {
      enqueueSnackbar('Left event!', { variant: 'success' });
    }
    if (removeParticipant.isError) {
      enqueueSnackbar('Failed to leave event', { variant: 'error' });
    }
  }, [enqueueSnackbar, removeParticipant.isSuccess, removeParticipant.isError]);

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.titleContainer}
          >
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                Participants{capacityMsg}
              </Typography>
            </Grid>
            <Grid item>
              <ToggleParticipationButton
                onJoin={() => addParticipant.mutate({ event: eventId })}
                onLeave={() => removeParticipant.mutate(eventId)}
                onJoinWaitlist={() => {}}
                isFull={isFull}
                isParticipant={isParticipant}
                loading={
                  addParticipant.isLoading || removeParticipant.isLoading
                }
                disabled={loadingParticipants || isPast || isCanceled}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid className={classes.fullWidth} item>
          <ParticipantTable
            participants={participants}
            teams={event ? event.teams : []}
            isParticipant={isParticipant}
            onJoin={(team) => addParticipant.mutate({ event: eventId, team })}
            loading={addParticipant.isLoading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(ParticipantsPanel);
