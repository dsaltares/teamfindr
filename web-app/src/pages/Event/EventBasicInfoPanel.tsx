import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';
import LockIcon from '@material-ui/icons/Lock';
import CancelIcon from '@material-ui/icons/Cancel';
import { Event } from '../../types';
import Map from '../../components/Map';
import useStyles from './EventBasicInfoPanel.styles';
import getGoogleMapsUrl from '../../utils/getGoogleMapsUrl';
import formatDate from '../../utils/formatDate';
import { CurrencyFlags } from '../../utils/currencies';
import SportIcons from '../../utils/sportIcons';
import AddToCalendarMenu from './AddToCalendarMenu';

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
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            {text ? (
              <Typography variant="body2" color="textSecondary">
                {text}
              </Typography>
            ) : (
              <Skeleton variant="text" />
            )}
          </Grid>
          {/* <Grid item>{right || null}</Grid> */}
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
  const venue = event?.venue;

  const items = [
    ...(!!event?.canceledAt
      ? [
          {
            key: 'cancelled',
            Icon: CancelIcon,
            text: 'This event has been canceled.',
          },
        ]
      : []),
    {
      key: 'sport',
      Icon: event ? SportIcons[event.sport] : SportIcons['Football'],
      text: event?.sport,
    },
    {
      key: 'location',
      Icon: LocationOnIcon,
      text:
        venue &&
        `${venue.name} - ${
          venue.location.description || venue.location.name || ''
        }`,
      link: getGoogleMapsUrl(venue),
    },
    {
      key: 'date',
      Icon: EventIcon,
      text: event ? formatDate(event?.startsAt) : '',
      rightDecoration: <AddToCalendarMenu event={event} />,
    },
    {
      key: 'price',
      Icon: CreditCardIcon,
      text: event
        ? `${event.price.amount} ${event.price.currency} ${
            CurrencyFlags[event.price.currency]
          }`
        : '',
    },
    {
      key: 'linkOnly',
      Icon: LockIcon,
      text: 'Private event - only users with the link can see it.',
      hidden: !event || !event.linkOnly,
    },
    {
      key: 'description',
      Icon: InfoIcon,
      text: event?.description,
    },
  ];

  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        {items.map((item, index) =>
          !item.hidden ? (
            <React.Fragment key={item.key}>
              {index > 0 && <Divider />}
              <InfoRow
                icon={<item.Icon />}
                text={item.text}
                link={item.link}
                rightDecoration={item.rightDecoration}
              />
            </React.Fragment>
          ) : null
        )}
      </Grid>
      <CardMedia>
        <Map location={venue?.location || null} />
      </CardMedia>
    </Card>
  );
};

export default React.memo(EventBasicInfoPanel);
