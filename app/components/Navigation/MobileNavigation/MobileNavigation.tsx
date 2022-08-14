import React from 'react';
import BottomNavigationBase from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory, useLocation } from 'react-router-dom';
import NavigationItems from '../navigationItems';
import { useUser } from '@lib/hooks';
import useStyles from './MobileNavigation.styles';

const MobileNavigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const selectedValue = location.pathname.split('/')[1];
  const { user } = useUser();

  const handleNavigationChange = (
    _event: React.ChangeEvent<unknown>,
    value: string
  ) => {
    history.push(`/${value}`);
  };

  return (
    <>
      <BottomNavigationBase className={classes.filler} />
      <BottomNavigationBase
        className={classes.navigation}
        value={selectedValue}
        onChange={handleNavigationChange}
      >
        {NavigationItems.map(
          (item) =>
            (!item.loggedInOnly || !!user) && (
              <BottomNavigationAction
                key={item.value}
                value={item.value}
                label={item.label}
                icon={<item.icon />}
              />
            )
        )}
      </BottomNavigationBase>
    </>
  );
};

export default React.memo(MobileNavigation);
