import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import useStyles from './NavigationItem.styles';

interface ListItemProps {
  icon: React.ComponentType;
  text: string;
  to: string;
  selected?: boolean;
}

const NavigationItem: React.FC<ListItemProps> = ({
  icon: Icon,
  text,
  to,
  selected,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.item}
      selected={selected}
      button
      component={Link}
      to={to}
    >
      <ListItemIcon className={classes.icon}>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
};

export default React.memo(NavigationItem);
