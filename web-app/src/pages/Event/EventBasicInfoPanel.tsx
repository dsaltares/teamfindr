import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Event } from '../../types';
import Map from '../../components/Map';
import useStyles from './EventBasicInfoPanel.styles';
import getGoogleMapsUrl from '../../utils/getGoogleMapsUrl';
import formatDate from '../../utils/formatDate';
import { CurrencyFlags } from '../../utils/currencies';

interface InfoRowProps {
  icon: React.ReactNode;
  text?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      spacing={1}
      alignItems="center"
      className={classes.info}
    >
      <Grid item className={classes.iconContainer}>
        {icon}
      </Grid>
      <Grid item className={classes.address}>
        {text ? (
          <Typography variant="body2" color="textSecondary">
            {text}
          </Typography>
        ) : (
          <Skeleton variant="text" />
        )}
      </Grid>
    </Grid>
  );
};

interface EventBasicInfoPanelProps {
  event?: Event;
}

const EventBasicInfoPanel: React.FC<EventBasicInfoPanelProps> = ({ event }) => {
  const classes = useStyles();
  const venue = event?.venue;

  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item>
          <Link
            component="a"
            href={getGoogleMapsUrl(venue)}
            rel="nofollow noopener"
            target="_blank"
            color="inherit"
            underline="none"
          >
            <InfoRow
              icon={<LocationOnIcon />}
              text={venue?.location.description || venue?.location.name || ''}
            />
          </Link>
        </Grid>
        <Divider />
        <Grid item>
          <InfoRow
            icon={<EventIcon />}
            text={event ? formatDate(event?.startsAt) : ''}
          />
        </Grid>
        <Divider />
        <Grid item>
          <InfoRow
            icon={<CreditCardIcon />}
            text={
              event
                ? `${event.price.amount} ${event.price.currency} ${
                    CurrencyFlags[event.price.currency]
                  }`
                : ''
            }
          />
        </Grid>
        <Divider />
        <Grid item>
          <InfoRow icon={<InfoIcon />} text={event?.description} />
        </Grid>
      </Grid>
      <CardMedia>
        <Map location={venue?.location || null} />
      </CardMedia>
    </Card>
  );
};

export default React.memo(EventBasicInfoPanel);
