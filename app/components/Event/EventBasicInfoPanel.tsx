import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import formatDate from '@lib/utils/formatDate';
import getGoogleMapsUrl from '@lib/utils/getGoogleMapsUrl';
import Map from '@components/Map';
import type { Event } from '@lib/types';
import SportTab from '@components/SportTab';
import HostedBy from '@components/HostedBy';
import CancelledIndicator from '@components/CancelledIndicator';
import EventPrivacy from '@components/EventPrivacy';
import AddToCalendarMenu from './AddToCalendarMenu';
import useStyles from './EventBasicInfoPanel.styles';

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
    <Link component="a" href={link} color="inherit">
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
        {venue ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={classes.venueImage}
            src={venue.images[0]}
            alt="venue"
          />
        ) : (
          <Skeleton
            className={classes.venueImage}
            variant="rect"
            animation="pulse"
          />
        )}
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
          {isCancelled ? (
            <CancelledIndicator />
          ) : (
            <EventPrivacy isPrivate={!!event?.linkOnly} />
          )}
        </Grid>
      </Grid>
      <div>
        <Map location={venue?.location || null} />
      </div>
    </Paper>
  );
};

export default React.memo(EventBasicInfoPanel);
