import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '../Avatar';
import useStyles from './AvatarMenu.styles';
import { useUser, useLogout } from '../../hooks';
import { User } from '../../types';

const AvatarMenu = () => {
  const user = useUser().user as User;
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const classes = useStyles();

  const menuItems = [
    {
      key: 'logout',
      label: 'Log out',
      onClick: handleLogout,
      Icon: ExitToAppIcon,
    },
  ];

  return (
    <>
      <Button className={classes.fullHeight} onClick={handleClick}>
        <Avatar avatar={user.avatar} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.key} onClick={item.onClick}>
            <ListItemIcon className={classes.itemIcon}>
              <item.Icon />
            </ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default React.memo(AvatarMenu);
