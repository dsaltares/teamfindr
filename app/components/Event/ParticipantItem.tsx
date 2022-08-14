import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@components/Avatar';
import type { User } from '@lib/types';
import useStyles from './ParticipantItem.styles';

interface ParticipantProps {
  user?: User;
  index: number;
}

const ParticipantItem: React.FC<ParticipantProps> = ({ user, index }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem} component="div">
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar
          size="medium"
          firstName={user?.firstName}
          lastName={user?.lastName}
          avatar={user?.avatar}
          placeholder={!user}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={
          user
            ? `${user.firstName} ${user.lastName?.substr(0, 1)}.`
            : `Player ${index + 1}`
        }
        primaryTypographyProps={{ color: 'textPrimary' }}
      />
    </ListItem>
  );
};

export default React.memo(ParticipantItem);
