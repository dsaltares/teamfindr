import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Event } from '../../types';
import { Link } from 'react-router-dom';
import useStyles from './EventListItem.styles';

interface EventListItemProps {
  event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const classes = useStyles();
  return (
    <ListItem button component="li">
      <Link className={classes.link} to={`/events/${event.id}`}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Hello"
          // primary={event.name}
          // secondary={`${event.location.name} ${event.location.description}`}
        />
      </Link>
    </ListItem>
  );
};

export default React.memo(EventListItem);
