import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EventList from '../../components/EventList';
import useStyles from './FutureEventsPanel.styles';
import { Event } from '../../types';

interface FutureEventsPanelProps {
  events: Event[];
}

const FutureEventsPanel: React.FC<FutureEventsPanelProps> = ({ events }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.eventsPaper}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography
            className={classes.titleContainer}
            variant="body1"
            color="textSecondary"
          >
            Upcoming events
          </Typography>
        </Grid>
        <Grid item>
          <EventList events={events} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(FutureEventsPanel);
