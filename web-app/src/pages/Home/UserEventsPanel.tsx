import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import EventIcon from '@material-ui/icons/Event';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import useStyles from './UserEventsPanel.styles';
import { useEvents } from '../../hooks';
import EventList from '../../components/EventList';
import Tabs, { TabType } from '../../components/Tabs';
import NoResults from '../../components/NoResults';
import todayAtMidnight from '../../utils/todayAtMidnight';
interface EventsForUserProps {
  mode: 'after' | 'before';
}
const EventsForUser: React.FC<EventsForUserProps> = React.memo(({ mode }) => {
  const classes = useStyles();
  const [currentDate] = useState(todayAtMidnight());
  const { events } = useEvents({
    isParticipant: true,
    [mode]: currentDate,
  });

  return events ? (
    <Grid
      container
      className={classes.eventContainer}
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={12} className={classes.eventList}>
        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <NoResults
            primaryText={
              mode === 'after' ? 'No upcoming events.' : 'No past events'
            }
            width="131"
            height="100"
          />
        )}
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/events"
          startIcon={<SearchIcon />}
        >
          Look for an event
        </Button>
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

  return <Tabs value={currentTab} onChange={setCurrentTab} tabs={AllTabs} />;
};

export default React.memo(UserEventsPanel);
