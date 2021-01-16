import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { isMobile } from 'react-device-detect';
import fileDownload from 'js-file-download';
import { Event } from '../../types';
import useStyles from './AddToCalendarMenu.styles';
import getCalendarUrl, { CalendarType } from '../../utils/getCalendarUrl';
import Link from '@material-ui/core/Link';

const MenuItems = [
  {
    key: 'google',
    label: 'Google Calendar',
  },
  {
    key: 'outlook',
    label: 'Outlook',
  },
  {
    key: 'office365',
    label: 'Office365',
  },
  {
    key: 'ics',
    label: 'ICS',
  },
];

interface AddToCalendarMenuProps {
  event?: Event;
}

const AddToCalendarMenu: React.FC<AddToCalendarMenuProps> = ({ event }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.denseButton}
        color="primary"
        variant="outlined"
        onClick={handleOpen}
        startIcon={<AddIcon />}
        disabled={!event}
      >
        Add to calendar
      </Button>
      <Menu
        id="add-to-calendar-menu"
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
        {event &&
          MenuItems.map((item) => {
            const url = getCalendarUrl(item.key as CalendarType, event);
            const shouldDownload = !isMobile && url.startsWith('data');

            const menuItemProps = shouldDownload
              ? {
                  onClick: () => {
                    handleClose();
                    const filename = 'download.ics';
                    const data = decodeURIComponent(
                      url.replace('data:text/calendar;charset=utf8,', '')
                    );
                    fileDownload(data, filename);
                  },
                }
              : {
                  component: Link,
                  rel: 'nofollow noreferrer',
                  target: '_blank',
                  href: url,
                  underline: 'none',
                  onClick: handleClose,
                };

            return (
              <MenuItem key={item.key} dense {...menuItemProps}>
                {item.label}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};

export default React.memo(AddToCalendarMenu);