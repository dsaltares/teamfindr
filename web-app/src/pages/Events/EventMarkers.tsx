import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Marker as PinIcon } from '../../components/Map/icons';
import { Event } from '../../types';
import { toLeaflet } from '../../utils/leaflet';
import formatDate from '../../utils/formatDate';
import useStyles from './EventMarkers.styles';

interface EventMarkersProps {
  events?: Event[];
}

type EventsByVenue = Record<string, Event[]>;

const EventMarkers: React.FC<EventMarkersProps> = ({ events = [] }) => {
  const classes = useStyles();
  const [eventsByVenue, setEventsByVenue] = useState<EventsByVenue>({});
  useEffect(() => {
    const newByVenue: EventsByVenue = {};
    events.forEach((event) => {
      const byVenue = newByVenue[event.venue.id] || [];
      byVenue.push(event);
      newByVenue[event.venue.id] = byVenue;
    });
    setEventsByVenue(newByVenue);
  }, [events, setEventsByVenue]);
  return (
    <>
      {Object.keys(eventsByVenue).map((venueId) => {
        const events = eventsByVenue[venueId];
        const venue = events[0].venue;
        return (
          <Marker
            key={venue.id}
            position={toLeaflet(venue.location.geo.coordinates)}
            icon={PinIcon}
          >
            <Popup>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="caption">{venue.name}</Typography>
                </Grid>
                <Grid item>
                  <ul className={classes.list}>
                    {events.map((event) => (
                      <li key={event.id}>
                        <Link to={`/events/${event.id}`}>
                          <Grid item>
                            <Typography variant="caption">
                              {formatDate(event.startsAt)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption">{`${event.sport} at ${event.venue.name}`}</Typography>
                          </Grid>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default React.memo(EventMarkers);
