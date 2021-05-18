import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';
import { Event } from '../../types';
import Map from '../../components/Map';
import useStyles from './EventBasicInfoPanel.styles';
import getGoogleMapsUrl from '../../utils/getGoogleMapsUrl';
import formatDate from '../../utils/formatDate';
import AddToCalendarMenu from './AddToCalendarMenu';
import Paper from '@material-ui/core/Paper';
import SportTab from '../../components/SportTab';
import HostedBy from '../../components/HostedBy';
import EventPrivacy from '../../components/EventPrivacy';

interface InfoRowProps {
  icon: React.ReactNode;
  text?: string;
  link?: string;
  rightDecoration?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  text,
  link,
  rightDecoration,
}) => {
  const classes = useStyles();
  const content = (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item className={classes.iconContainer}>
        {icon}
      </Grid>
      <Grid item className={classes.address}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            {text ? (
              <Typography variant="body2" color="textPrimary">
                {text}
              </Typography>
            ) : (
              <Skeleton variant="text" />
            )}
          </Grid>
          <Grid item>{rightDecoration || null}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return link ? (
    <Link
      component="a"
      href={link}
      rel="nofollow noopener"
      target="_blank"
      color="inherit"
      underline="none"
    >
      {content}
    </Link>
  ) : (
    content
  );
};

interface EventBasicInfoPanelProps {
  event?: Event;
}

const EventBasicInfoPanel: React.FC<EventBasicInfoPanelProps> = ({ event }) => {
  const classes = useStyles();
  const isCancelled = !!event?.canceledAt;
  const venue = event?.venue;

  return (
    <Paper className={classes.paper}>
      <div className={classes.imgContainer}>
        <div className={classes.tabContainer}>
          <SportTab sport={event?.sport} isCancelled={isCancelled} inImage />
        </div>
        <img
          className={classes.venueImage}
          src="https://scontent.fclj2-1.fna.fbcdn.net/v/t1.6435-9/106371406_3091783634236528_3551108379228035343_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=e3f864&_nc_ohc=zuBxzdF-jzkAX_IWMsH&_nc_ht=scontent.fclj2-1.fna&oh=6c8a403c02b5c2366512e653d3a0dd07&oe=60BC1AD0"
          alt="venue"
        />
      </div>
      <Grid container direction="column" spacing={2} className={classes.grid}>
        <Grid item>
          <InfoRow
            icon={<LocationOnIcon />}
            text={
              venue &&
              `${venue.name} - ${
                venue.location.description || venue.location.name || ''
              }`
            }
            link={getGoogleMapsUrl(venue)}
          />
        </Grid>
        <Grid item>
          <InfoRow
            icon={<EventIcon />}
            text={event ? formatDate(event?.startsAt) : ''}
            rightDecoration={<AddToCalendarMenu event={event} />}
          />
        </Grid>
        <Grid item>
          <InfoRow
            icon={<AttachMoneyIcon />}
            text={event ? `${event.price.amount} ${event.price.currency}` : ''}
          />
        </Grid>
        <Grid item>
          <InfoRow icon={<InfoIcon />} text={event ? event.description : ''} />
        </Grid>
      </Grid>
      <Grid
        className={classes.grid}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <HostedBy user={event?.createdBy} />
        </Grid>
        <Grid item>
          <EventPrivacy isPrivate={!!event?.linkOnly} />
        </Grid>
      </Grid>
      <div>
        <Map location={venue?.location || null} />
      </div>
    </Paper>
  );
};

export default React.memo(EventBasicInfoPanel);
