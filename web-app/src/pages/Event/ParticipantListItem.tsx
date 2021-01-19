import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '../../components/Avatar';
import { Participant } from '../../types';
import { useUser } from '../../hooks';
import useStyles from './ParticipantListItem.styles';

interface ParticipantProps {
  participant: Participant;
  onLeave: () => void;
  leaving: boolean;
  isPast: boolean;
}

const ParticipantListItem: React.FC<ParticipantProps> = ({
  participant,
  onLeave,
  leaving,
  isPast,
}) => {
  const { user } = participant;
  const classes = useStyles();
  const { user: currentUser } = useUser();
  const isCurrentUser = currentUser && currentUser.id === user.id;

  return (
    <ListItem component="li">
      <ListItemAvatar>
        <Avatar
          firstName={user.firstName}
          lastName={user.lastName}
          avatar={user.avatar}
        />
      </ListItemAvatar>
      <ListItemText primary={`${user.firstName} ${user.lastName}`} />
      {isCurrentUser && !isPast && (
        <ListItemSecondaryAction>
          <Button
            className={classes.button}
            startIcon={<RemoveCircleIcon />}
            color="primary"
            variant="outlined"
            disabled={leaving}
            onClick={(e) => {
              e.preventDefault();
              onLeave();
            }}
          >
            {leaving ? <CircularProgress size={24} color="primary" /> : 'Leave'}
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default React.memo(ParticipantListItem);
