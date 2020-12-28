import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Venue } from '../../types';
import { Link } from 'react-router-dom';

interface VenueListItemProps {
  venue: Venue;
}

const VenueListItem: React.FC<VenueListItemProps> = ({ venue }) => {
  return (
    <ListItem button component={Link} to={`/venues/${venue.id}`}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={venue.name}
        secondary={`${venue.location.name} ${venue.location.description}`}
      />
    </ListItem>
  );
};

export default React.memo(VenueListItem);
