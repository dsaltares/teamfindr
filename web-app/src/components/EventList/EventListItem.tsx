import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

interface EventProps {
  event: Event;
}

const EventListItem: React.FC<EventProps> = ({ event }) => {
  const classes = useStyles();
  const history = useHistory();
  const Icon = SportIcons[event.sport] as typeof SvgIcon;
  const eventLink = `/events/${event.id}`;

  const handleViewEventClick = () => {
    history.push(eventLink);
  };

  return (
    <ListItem className={classes.listItem} button component="li">
      <Link className={classes.link} to={eventLink}>
        <div className={classes.cardWrapper}>
          <div className={classes.sportTab}>
            <div className={classes.sportWrapper}>
              <Typography variant="body2">{event.sport}</Typography>
            </div>
            <div>
              <Icon fontSize="small" />
            </div>
          </div>
          <div className={classes.sportCard}>
            <Box display="flex" flexDirection="row">
              <Box marginRight={1}>
                <img
                  className={classes.venueImage}
                  src="https://www.clujlife.com/wp-content/uploads/2016/12/baza-sportiva-gheorghieni-cluj.jpg"
                  alt="venue"
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  marginBottom={2}
                >
                  <div className={classes.infoIconWrapper}>
                    <LocationOnIcon />
                  </div>
                  <Typography variant="body2">{event.venue.name}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  marginBottom={2}
                >
                  <div className={classes.infoIconWrapper}>
                    <EventIcon />
                  </div>
                  <Typography variant="body2">
                    {formatDate(event.startsAt)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    marginRight={5}
                  >
                    <div className={classes.infoIconWrapper}>
                      <AttachMoneyIcon />
                    </div>
                    <Typography variant="body2">{`${event.price.amount} ${event.price.currency}`}</Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center">
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="row">
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
              <Button
                color="primary"
                variant="contained"
                onClick={handleViewEventClick}
              >
                View event
              </Button>
            </Box>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};

export default React.memo(EventListItem);
