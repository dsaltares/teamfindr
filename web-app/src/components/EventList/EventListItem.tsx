import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Event } from '../../types';
import useStyles from './EventListItem.styles';
import UserAvatar from '../Avatar';
import formatDate from '../../utils/formatDate';
import SportIcons from '../../utils/sportIcons';
import CancelledIndicator from './CancelledIndicator';

interface EventProps {
  event: Event;
}

const EventListItem: React.FC<EventProps> = ({ event }) => {
  const classes = useStyles();
  const Icon = SportIcons[event.sport] as typeof SvgIcon;
  const eventLink = `/events/${event.id}`;
  const isCancelled = !!event.canceledAt;

  return (
    <ListItem className={classes.listItem} component="li">
      <Link className={classes.link} to={eventLink}>
        <div className={classes.cardWrapper}>
          <div
            className={clsx(
              classes.sportTab,
              isCancelled && classes.sportTabCancelled
            )}
          >
            <div className={classes.sportWrapper}>
              <Typography variant="body2">{event.sport}</Typography>
            </div>
            <div>
              <Icon fontSize="small" />
            </div>
          </div>
          <div className={classes.sportCard}>
            <Box display="flex">
              <Box marginRight={1}>
                <img
                  className={classes.venueImage}
                  src="https://scontent.fclj2-1.fna.fbcdn.net/v/t1.6435-9/106371406_3091783634236528_3551108379228035343_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=e3f864&_nc_ohc=zuBxzdF-jzkAX_IWMsH&_nc_ht=scontent.fclj2-1.fna&oh=6c8a403c02b5c2366512e653d3a0dd07&oe=60BC1AD0"
                  alt="venue"
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <div className={classes.infoIconWrapper}>
                    <LocationOnIcon />
                  </div>
                  <Typography variant="body2">{event.venue.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <div className={classes.infoIconWrapper}>
                    <EventIcon />
                  </div>
                  <Typography variant="body2">
                    {formatDate(event.startsAt)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" marginRight={2}>
                    <div className={classes.infoIconWrapper}>
                      <AttachMoneyIcon />
                    </div>
                    <Typography variant="body2">{`${event.price.amount} ${event.price.currency}`}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <div className={classes.infoIconWrapper}>
                      <GroupIcon />
                    </div>
                    <Typography variant="body2">{`${event.numParticipants} / ${event.capacity}`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box paddingTop={2} paddingBottom={2}>
              <Divider />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Box marginRight={1}>
                  <UserAvatar
                    firstName={event.createdBy.firstName}
                    lastName={event.createdBy.lastName}
                    size="large"
                    avatar={event.createdBy.avatar}
                  />
                </Box>
                <Box display="flex" flexDirection="column">
                  <div>
                    <Typography variant="body2" color="textPrimary">
                      Hosted by
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      component="div"
                      variant="body1"
                      color="textPrimary"
                    >
                      <Box fontWeight="fontWeightBold">
                        {`${event.createdBy.firstName} ${event.createdBy.lastName}`}
                      </Box>
                    </Typography>
                  </div>
                </Box>
              </Box>
              {isCancelled && <CancelledIndicator />}
            </Box>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};

export default React.memo(EventListItem);
