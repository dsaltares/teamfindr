import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import ParticipantList from './ParticipantList';
import {
  useEvent,
  useUser,
  useParticipants,
  useAddParticipant,
  useRemoveParticipant,
  useEnablePushSnackbar,
} from '../../hooks';
import useStyles from './ParticipantsPanel.styles';
import SportsIcons from '../../utils/sportIcons';

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
  const isFull = event && event.numParticipants >= event.capacity;
  const isParticipant =
    participants && user && !!participants.find((p) => p.user.id === user.id);
  const isPast = Boolean(event && event.startsAt < new Date().toISOString());
  const isCanceled = !!event?.canceledAt;
  const Icon = event ? SportsIcons[event.sport] : null;
  const icon = Icon ? <Icon /> : null;
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
              {participants && !isParticipant && (
                <Button
                  startIcon={icon}
                  color="primary"
                  variant="outlined"
                  disabled={
                    loadingParticipants ||
                    addParticipant.isLoading ||
                    isFull ||
                    isPast ||
                    isCanceled
                  }
                  onClick={() => addParticipant.mutate(eventId)}
                >
                  {addParticipant.isLoading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : isFull ? (
                    'Full'
                  ) : (
                    'Join'
                  )}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ParticipantList
            participants={participants}
            onLeave={() => removeParticipant.mutate(eventId)}
            leaving={removeParticipant.isLoading}
            isPast={isPast}
            isCanceled={isCanceled}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(ParticipantsPanel);
