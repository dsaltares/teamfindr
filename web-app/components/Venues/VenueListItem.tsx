import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import type { Venue } from '@lib/types';
import useStyles from './VenueListItem.styles';

interface VenueListItemProps {
  venue: Venue;
}

const VenueListItem: React.FC<VenueListItemProps> = ({ venue }) => {
  const classes = useStyles();
  return (
    <ListItem button component="li">
      <Link className={classes.link} to={`/venues/${venue.id}`}>
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}
            variant="rounded"
            alt={venue.name}
            src={venue.images[0]}
          />
        </ListItemAvatar>
        <ListItemText
          primary={venue.name}
          secondary={`${venue.location.name} ${venue.location.description}`}
        />
      </Link>
    </ListItem>
  );
};

export default React.memo(VenueListItem);
