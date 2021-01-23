import React from 'react';
import List from '@material-ui/core/List';
import EventListItem from './EventListItem';
import { Event } from '../../types';
import useStyles from './EventList.styles';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </List>
  );
};

export default React.memo(EventList);
