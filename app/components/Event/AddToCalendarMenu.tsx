import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import type { Event } from '@lib/types';
import { getGoogleCalendarUrl, downloadICS } from '@lib/utils/calendar';
import useStyles from './AddToCalendarMenu.styles';

interface AddToCalendarMenuProps {
  event?: Event;
}

const AddToCalendarMenu: React.FC<AddToCalendarMenuProps> = ({ event }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        color="primary"
        ref={anchorRef}
        disabled={!event}
      >
        <Button
          className={classes.button}
          component={Link}
          href={event ? getGoogleCalendarUrl(event) : undefined}
          rel="nofollow noreferrer"
          target="_blank"
          underline="none"
          onClick={handleClose}
          disabled={!event}
        >
          Add to Calendar
        </Button>
        <Button
          className={classes.button}
          color="primary"
          size="small"
          onClick={handleToggle}
        >
          <ExpandMoreIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="add-to-calendar-menu"
        anchorEl={anchorRef.current}
        keepMounted
        open={open}
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
        <MenuItem
          dense
          onClick={() => {
            handleClose();
            downloadICS(event as Event);
          }}
        >
          Download ICS
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(AddToCalendarMenu);
