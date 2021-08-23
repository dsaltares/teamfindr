import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import GroupIcon from '@material-ui/icons/Group';
import { useHistory } from 'react-router';
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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const enqueueEnablePushSnackbar = useEnablePushSnackbar();
  const { participants, isLoading: loadingParticipants } = useParticipants(
    eventId
  );

  const onAddSuccess = useCallback(() => {
    enqueueSnackbar('Joined event!', { variant: 'success' });
    enqueueEnablePushSnackbar();
  }, [enqueueSnackbar, enqueueEnablePushSnackbar]);
  const onAddError = useCallback(() => {
    enqueueSnackbar('Failed to join event', { variant: 'error' });
  }, [enqueueSnackbar]);
  const addParticipant = useAddParticipant({
    onSuccess: onAddSuccess,
    onError: onAddError,
  });

  const onRemoveSuccess = useCallback(() => {
    enqueueSnackbar('Left event!', { variant: 'success' });
  }, [enqueueSnackbar]);
  const onRemoveError = useCallback(() => {
    enqueueSnackbar('Failed to leave event', { variant: 'error' });
  }, [enqueueSnackbar]);
  const removeParticipant = useRemoveParticipant({
    onSuccess: onRemoveSuccess,
    onError: onRemoveError,
  });

  const onJoinTeam = useCallback(
    (team?: number) => {
      if (user) {
        addParticipant.mutate({ event: eventId, team });
      } else {
        history.push(
          `/login?redirect=${encodeURIComponent(
            window.location.href
          )}&action=joinEvent`
        );
      }
    },
    [addParticipant, eventId, history, user]
  );

  const onJoinAnyTeam = useCallback(() => onJoinTeam(), [onJoinTeam]);

  const onLeave = useCallback(() => {
    removeParticipant.mutate(eventId);
  }, [removeParticipant, eventId]);

  const isFull = !!event && event.numParticipants >= event.capacity;
  const isParticipant =
    !!participants &&
    !!user &&
    !!participants.find((p) => p.user.id === user.id);
  const isPast = Boolean(event && event.startsAt < new Date().toISOString());
  const isCanceled = !!event?.canceledAt;

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item>
                  <GroupIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="textPrimary">
                    <div className={classes.bold}>Players</div>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="primary" component="span">
                    {event ? event.numParticipants : ''}
                  </Typography>
                  <Typography
                    variant="h3"
                    color={isFull ? 'primary' : 'textPrimary'}
                    component="span"
                  >
                    {event ? `/${event.capacity}` : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ToggleParticipationButton
                onJoin={onJoinAnyTeam}
                onLeave={onLeave}
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
        <Grid item>
          <ParticipantTable
            participants={participants}
            teams={event ? event.teams : []}
            isParticipant={isParticipant}
            onJoin={onJoinTeam}
            loading={addParticipant.isLoading}
            capacity={event ? event.capacity : 0}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(ParticipantsPanel);
