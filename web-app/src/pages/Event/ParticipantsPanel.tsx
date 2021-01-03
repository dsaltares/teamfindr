import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ParticipantList from './ParticipantList';
import {
  useEvent,
  useUser,
  useParticipants,
  useAddParticipant,
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
  const { participants, isLoading: loadingParticipants } = useParticipants(
    eventId
  );
  const addParticipant = useAddParticipant();
  const isFull = event && event.numParticipants >= event.capacity;
  const isParticipant =
    participants && user && !!participants.find((p) => p.user.id === user.id);
  const Icon = event ? SportsIcons[event.sport] : null;
  const icon = Icon ? <Icon /> : null;
  const capacityMsg = event
    ? ` (${event.numParticipants}/${event.capacity})`
    : '';

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
              <Typography
                className={classes.titleContainer}
                variant="body1"
                color="textSecondary"
              >
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
                    loadingParticipants || addParticipant.isLoading || isFull
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
          <ParticipantList eventId={eventId} participants={participants} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(ParticipantsPanel);
