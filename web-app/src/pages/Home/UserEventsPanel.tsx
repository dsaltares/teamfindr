import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import EventIcon from '@material-ui/icons/Event';
import HistoryIcon from '@material-ui/icons/History';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import useStyles from './UserEventsPanel.styles';
import { useEvents } from '../../hooks';
import EventList from '../../components/EventList';
import Tabs, { TabType } from '../../components/Tabs';
import { Link } from 'react-router-dom';

interface EventsForUserProps {
  mode: 'after' | 'before';
}
const EventsForUser: React.FC<EventsForUserProps> = React.memo(({ mode }) => {
  const classes = useStyles();
  const [currentDate] = useState(new Date());
  const { events } = useEvents({
    isParticipant: true,
    [mode]: currentDate,
  });

  return events ? (
    <Grid container direction="column">
      <Grid item>
        <EventList events={events} />
      </Grid>
      <Grid item>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            to="/events"
            startIcon={<SportsSoccerIcon />}
          >
            Look for an event
          </Button>
        </div>
      </Grid>
    </Grid>
  ) : (
    <Skeleton width="100%" height={200} variant="rect" />
  );
});

const AllTabs: TabType[] = [
  {
    value: 'future',
    label: 'Upcoming events',
    Icon: EventIcon,
    Component: () => <EventsForUser mode="after" />,
  },
  {
    value: 'past',
    label: 'Past events',
    Icon: HistoryIcon,
    Component: () => <EventsForUser mode="before" />,
  },
];

const UserEventsPanel = () => {
  const [currentTab, setCurrentTab] = useState('future');
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Tabs value={currentTab} onChange={setCurrentTab} tabs={AllTabs} />
    </Paper>
  );
};

export default React.memo(UserEventsPanel);