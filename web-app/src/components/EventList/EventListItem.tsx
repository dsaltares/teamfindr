import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import SportTab from '../SportTab';
import CancelledIndicator from '../CancelledIndicator';
import HostedBy from '../HostedBy';
import { Event } from '../../types';
import useStyles from './EventListItem.styles';
import formatDate from '../../utils/formatDate';

interface EventProps {
  event: Event;
}

const EventListItem: React.FC<EventProps> = ({ event }) => {
  const classes = useStyles();
  const eventLink = `/events/${event.id}`;
  const isCancelled = !!event.canceledAt;

  return (
    <ListItem className={classes.listItem} component="li">
      <Link className={classes.link} to={eventLink}>
        <div className={classes.cardWrapper}>
          <SportTab sport={event.sport} isCancelled={isCancelled} />
          <div className={classes.sportCard}>
            <div className={classes.flex}>
              <div className={classes.imgContainer}>
                <img
                  className={classes.venueImage}
                  src={event.venue.images[0]}
                  alt="venue"
                />
              </div>
              <div className={classes.flexColumn}>
                <div className={classes.eventDatumRow}>
                  <div className={classes.infoIconWrapper}>
                    <LocationOnIcon />
                  </div>
                  <Typography variant="body2">{event.venue.name}</Typography>
                </div>
                <div className={classes.eventDatumRow}>
                  <div className={classes.infoIconWrapper}>
                    <EventIcon />
                  </div>
                  <Typography variant="body2">
                    {formatDate(event.startsAt)}
                  </Typography>
                </div>
                <div className={classes.eventDataRow}>
                  <div className={classes.eventDatumCell}>
                    <div className={classes.infoIconWrapper}>
                      <AttachMoneyIcon />
                    </div>
                    <Typography variant="body2">{`${event.price.amount} ${event.price.currency}`}</Typography>
                  </div>
                  <div className={classes.eventDatumCell}>
                    <div className={classes.infoIconWrapper}>
                      <GroupIcon />
                    </div>
                    <Typography variant="body2">{`${event.numParticipants} / ${event.capacity}`}</Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.dividerContainer}>
              <Divider />
            </div>
            <div className={classes.cardBottomContainer}>
              <HostedBy user={event.createdBy} />
              {isCancelled && <CancelledIndicator />}
            </div>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};

export default React.memo(EventListItem);
