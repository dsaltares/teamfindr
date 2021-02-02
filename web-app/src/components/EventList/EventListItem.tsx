import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Event } from '../../types';
import { Link } from 'react-router-dom';
import useStyles from './EventListItem.styles';
import UserAvatar from '../Avatar';
import formatDate from '../../utils/formatDate';
import SportIcons from '../../utils/sportIcons';
import { CurrencyFlags } from '../../utils/currencies';

interface EventListItemProps {
  event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const classes = useStyles();
  const Icon = SportIcons[event.sport];
  return (
    <ListItem button component="li">
      <Link className={classes.link} to={`/events/${event.id}`}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          spacing={1}
        >
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar variant="rounded">
                  <Icon />
                </Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="body1">
                      {`${event.sport} - `}
                      <span
                        className={
                          event.canceledAt ? classes.canceled : undefined
                        }
                      >
                        {formatDate(event.startsAt)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="textSecondary">
                      {event.venue.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <UserAvatar
                          firstName={event.createdBy.firstName}
                          lastName={event.createdBy.lastName}
                          size="small"
                          avatar={event.createdBy.avatar}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" color="textSecondary">
                          {`Hosted by ${event.createdBy.firstName} ${event.createdBy.lastName}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item>
                <Typography variant="caption" color="textSecondary">
                  {`${event.price.amount} ${event.price.currency} ${
                    CurrencyFlags[event.price.currency]
                  }`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color="textSecondary">
                  {`${event.numParticipants} / ${event.capacity}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </ListItem>
  );
};

export default React.memo(EventListItem);
