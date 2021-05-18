import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Venue } from '../../types';
import { Link } from 'react-router-dom';
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
            src="https://scontent.fclj2-1.fna.fbcdn.net/v/t1.6435-9/106371406_3091783634236528_3551108379228035343_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=e3f864&_nc_ohc=zuBxzdF-jzkAX_IWMsH&_nc_ht=scontent.fclj2-1.fna&oh=6c8a403c02b5c2366512e653d3a0dd07&oe=60BC1AD0"
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
