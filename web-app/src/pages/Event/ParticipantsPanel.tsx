import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { Event } from '../../types';
import useStyles from './ParticipantsPanel.styles';
import { Paper } from '@material-ui/core';
import SportsIcons from '../../utils/sportIcons';

interface ParticipantsPanelProps {
  event?: Event;
}

const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({ event }) => {
  const classes = useStyles();
  const Icon = event ? SportsIcons[event.sport] : PlusOneIcon;

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
              <Typography>Participants</Typography>
            </Grid>
            <Grid item>
              <Button startIcon={<Icon />} color="primary" variant="outlined">
                Join
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(ParticipantsPanel);
