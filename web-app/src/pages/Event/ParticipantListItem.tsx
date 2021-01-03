import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import { Participant } from '../../types';
import { useUser, useRemoveParticipant } from '../../hooks';
import useStyles from './ParticipantListItem.styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ParticipantProps {
  participant: Participant;
  eventId: string;
}

const ParticipantListItem: React.FC<ParticipantProps> = ({
  participant,
  eventId,
}) => {
  const { user } = participant;
  const classes = useStyles();
  const { user: currentUser } = useUser();
  const removeParticipant = useRemoveParticipant();
  const isCurrentUser = currentUser && currentUser.id === user.id;
  return (
    <ListItem button component="li">
      <Link className={classes.link} to={`/users/${user.id}`}>
        <ListItemAvatar>
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={user.avatar}
          />
        </ListItemAvatar>
        <ListItemText primary={`${user.firstName} ${user.lastName}`} />
        {isCurrentUser && (
          <ListItemSecondaryAction>
            <Button
              className={classes.button}
              startIcon={<RemoveCircleIcon />}
              color="primary"
              variant="outlined"
              disabled={removeParticipant.isLoading}
              onClick={(e) => {
                e.preventDefault();
                removeParticipant.mutate(eventId);
              }}
            >
              {removeParticipant.isLoading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                'Leave'
              )}
            </Button>
          </ListItemSecondaryAction>
        )}
      </Link>
    </ListItem>
  );
};

export default React.memo(ParticipantListItem);
