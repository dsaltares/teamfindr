import React from 'react';
import Paper from '@material-ui/core/Paper';
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
      <EventList events={events} />
    </Paper>
  );
};

export default React.memo(FutureEventsPanel);
