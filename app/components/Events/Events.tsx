import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router';
import DatePicker from '@components/DatePicker';
import SportsAutocomplete from '@components/SportsAutocomplete';
import LocationWithMapField from '@components/NewVenueDialog/LocationWithMapField';
import Page from '@components/Page';
import type { Location, Sport } from '@lib/types';
import {
  useCurrentLocation,
  useEvents,
  useSearchQuery,
  useUser,
} from '@lib/hooks';
import NewEventDialog from '@components/NewEventDialog';
import EventList from '@components/EventList/EventList';
import EventFiltersCollapsable from '@components/EventFiltersCollapsable';
import NoResults from '@components/NoResults';
import todayAtMidnight from '@lib/utils/todayAtMidnight';
import DateShortcuts from '@components/DateShortcuts';
import useStyles from './Events.styles';
import EventMarkers from './EventMarkers';

const Events = () => {
  const classes = useStyles();
  const { sport: sportQuery } = useSearchQuery();
  const { user } = useUser();
  const history = useHistory();
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number | undefined>(10);
  const [sports, setSports] = useState<Sport[]>(
    sportQuery ? [sportQuery as Sport] : []
  );
  const [date, setDate] = useState<Date | null>(todayAtMidnight());
  const [excludeFull, setNotFull] = useState<boolean>(false);
  const currentLocation = useCurrentLocation();
  const { events } = useEvents({
    location,
    radius,
    sports,
    after: date,
    excludeFull,
  });

  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const handleNewEventDialogOpen = () => {
    if (user) {
      setNewEventDialogOpen(true);
    } else {
      history.push(
        `/login?redirect=${encodeURIComponent(
          window.location.href
        )}&action=newEvent`
      );
    }
  };
  const handleNewEventDialogClose = () => setNewEventDialogOpen(false);

  const handleNotFullChange = (_e: React.ChangeEvent, value: boolean) =>
    setNotFull(value);

  useEffect(() => {
    if (currentLocation.location && !location) {
      setLocation(currentLocation.location);
    }
  }, [currentLocation, location]);

  useEffect(() => {
    if (sportQuery) {
      history.replace('/events');
    }
  }, [sportQuery, history]);

  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const onToggleFilters = useCallback(() => {
    setFiltersExpanded(!filtersExpanded);
  }, [filtersExpanded, setFiltersExpanded]);

  let eventContent = null;
  if (!events) {
    eventContent = (
      <Skeleton
        className={classes.eventSkeleton}
        width="100%"
        height="100%"
        variant="rect"
      />
    );
  } else {
    const message =
      sports.length === 1
        ? `No upcoming ${sports[0].toLowerCase()} events`
        : 'No upcoming events';
    eventContent =
      events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <NoResults
          primaryText={message}
          secondaryText="Try adjusting the filters!"
          width="131"
          height="100"
        />
      );
  }

  return (
    <>
      <Page
        title="Events"
        titleActions={[
          {
            key: 'newEvent',
            label: 'New event',
            icon: <AddIcon />,
            onClick: handleNewEventDialogOpen,
          },
        ]}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EventFiltersCollapsable
              expanded={filtersExpanded}
              onToggle={onToggleFilters}
              sports={sports}
              results={events?.length}
              radius={radius}
              location={location}
            >
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <LocationWithMapField
                    location={location}
                    onChange={setLocation}
                    disabled={currentLocation.isLoading}
                    around={currentLocation.location?.geo.coordinates}
                    circleRadius={radius}
                    onRadiusChange={setRadius}
                    markers={<EventMarkers events={events} />}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={excludeFull}
                        onChange={handleNotFullChange}
                        color="primary"
                        disabled={currentLocation.isLoading}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Exclude full events
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <SportsAutocomplete
                    multiple
                    value={sports}
                    onChange={(value) => setSports(value as Sport[])}
                    disabled={currentLocation.isLoading}
                  />
                </Grid>
                <Grid item>
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    label="From"
                    disabled={currentLocation.isLoading}
                    disablePast
                  />
                </Grid>
                <Grid item>
                  <DateShortcuts value={date} onChange={setDate} />
                </Grid>
              </Grid>
            </EventFiltersCollapsable>
          </Grid>
          <Grid item xs={12} md={6}>
            {eventContent}
          </Grid>
        </Grid>
      </Page>
      <NewEventDialog
        open={newEventDialogOpen}
        onClose={handleNewEventDialogClose}
      />
    </>
  );
};

export default React.memo(Events);
