import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { Event } from '../../types';
import useStyles from './AddToCalendarMenu.styles';
import addToCalendar, { CalendarType } from '../../utils/addToCalendar';

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
        {MenuItems.map((item) => (
          <MenuItem
            dense
            key={item.key}
            onClick={() => {
              addToCalendar(item.key as CalendarType, event as Event);
              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default React.memo(AddToCalendarMenu);
