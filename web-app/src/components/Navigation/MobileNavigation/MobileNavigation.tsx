import React from 'react';
import BottomNavigationBase from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import useStyles from './MobileNavigation.styles';
import NavigationProps from '../NavigationProps';

const MobileNavigation: React.FC<NavigationProps> = ({
  selectedValue,
  items,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleNavigationChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    history.push(`/${value}`);
  };

  return (
    <BottomNavigationBase
      className={classes.navigation}
      value={selectedValue}
      onChange={handleNavigationChange}
    >
      {items.map((item) => (
        <BottomNavigationAction
          key={item.value}
          value={item.value}
          label={item.label}
          icon={<item.icon />}
        />
      ))}
    </BottomNavigationBase>
  );
};

export default React.memo(MobileNavigation);
