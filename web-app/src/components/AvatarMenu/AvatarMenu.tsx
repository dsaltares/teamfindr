import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HttpsIcon from '@material-ui/icons/Https';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Avatar from '../Avatar';
import useStyles from './AvatarMenu.styles';
import { useUser, useLogout } from '../../hooks';
import Policies from '../../utils/policies';

const AvatarMenu = () => {
  const { user } = useUser();
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
    ...(user
      ? [
          {
            key: 'logout',
            label: 'Log out',
            onClick: handleLogout,
            Icon: ExitToAppIcon,
            danger: true,
          },
        ]
      : [
          {
            key: 'login',
            label: 'Log in',
            to: '/login',
            newTab: false,
            Icon: LockOpenIcon,
            onlyLoggedOut: true,
          },
        ]),
  ];

  return (
    <>
      <Button className={classes.fullHeight} onClick={handleClick}>
        <Avatar avatar={user?.avatar} size="large" />
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

          if (item.href) {
            return (
              <MenuItem
                key={item.key}
                onClick={handleClose}
                component={Link}
                href={item.href}
                target={item.newTab === false ? '_self' : '_blank'}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <item.Icon color="primary" />
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            );
          }

          if (item.to) {
            return (
              <MenuItem
                className={classes.routerLink}
                key={item.key}
                onClick={handleClose}
                component={RouterLink}
                to={item.to}
                target={item.newTab === false ? '_self' : '_blank'}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <item.Icon color="primary" />
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            );
          }

          return (
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
