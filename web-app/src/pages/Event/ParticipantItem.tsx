import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '../../components/Avatar';
import { Participant } from '../../types';
import useStyles from './ParticipantItem.styles';

interface ParticipantProps {
  participant: Participant;
}

const ParticipantItem: React.FC<ParticipantProps> = ({ participant }) => {
  const { user } = participant;
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem} component="div">
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar
          size="small"
          firstName={user.firstName}
          lastName={user.lastName}
          avatar={user.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={`${user.firstName} ${user.lastName}`}
        primaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItem>
  );
};

export default React.memo(ParticipantItem);
