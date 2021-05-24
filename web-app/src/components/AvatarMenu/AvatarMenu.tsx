import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HttpsIcon from '@material-ui/icons/Https';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import Avatar from '../Avatar';
import useStyles from './AvatarMenu.styles';
import { useUser, useLogout } from '../../hooks';
import { User } from '../../types';
import Policies from '../../utils/policies';

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
    handleClose();
  };

  const classes = useStyles();

  const menuItems = [
    {
      key: 'privacy',
      label: 'Privacy policy',
      Icon: HttpsIcon,
      href: Policies.Privacy,
    },
    {
      key: 'terms',
      label: 'Terms and conditions',
      Icon: GavelIcon,
      href: Policies.Terms,
    },
    {
      key: 'cookie',
      label: 'Cookie policy',
      Icon: MenuBookIcon,
      href: Policies.Cookies,
    },
    { key: 'divider', divider: true },
    {
      key: 'logout',
      label: 'Log out',
      onClick: handleLogout,
      Icon: ExitToAppIcon,
      danger: true,
    },
  ];

  return (
    <>
      <Button className={classes.fullHeight} onClick={handleClick}>
        <Avatar avatar={user.avatar} size="large" />
      </Button>
      <Menu
        id="avatar-menu"
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
        {menuItems.map((item) => {
          if (item.divider) {
            return <Divider key={item.key} />;
          }
          return item.href ? (
            <MenuItem
              key={item.key}
              onClick={handleClose}
              component={Link}
              href={item.href}
            >
              <ListItemIcon className={classes.itemIcon}>
                <item.Icon />
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ) : (
            <MenuItem key={item.key} onClick={item.onClick}>
              <ListItemIcon className={classes.itemIcon}>
                {item.Icon && (
                  <item.Icon color={item.danger ? 'error' : undefined} />
                )}
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default React.memo(AvatarMenu);
