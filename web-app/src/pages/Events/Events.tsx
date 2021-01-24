import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import SportsAutocomplete from '../../components/SportsAutocomplete';
import DatePicker from '../../components/DatePicker';
import Skeleton from '@material-ui/lab/Skeleton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TuneIcon from '@material-ui/icons/Tune';
import useStyles from './Events.styles';
import { Location, Sport } from '../../types';
import { useCurrentLocation, useEvents } from '../../hooks';
import NewEventDialog from '../../components/NewEventDialog';
import EventList from '../../components/EventList/EventList';
import EventMarkers from './EventMarkers';
import Collapsable from '../../components/Collapsable';
import NoResults from '../../components/NoResults';
import todayAtMidnight from '../../utils/todayAtMidnight';

const Events = () => {
  const classes = useStyles();
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number | undefined>(10);
  const [sports, setSports] = useState<Sport[]>([]);
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
  const handleNewEventDialogOpen = () => setNewEventDialogOpen(true);
  const handleNewEventDialogClose = () => setNewEventDialogOpen(false);

  const handleNotFullChange = (e: React.ChangeEvent<{}>, value: boolean) =>
    setNotFull(value);

  useEffect(() => {
    if (currentLocation.location && !location) {
      setLocation(currentLocation.location);
    }
  }, [currentLocation, location]);

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
    eventContent = (
      <Paper className={classes.eventsPaper}>
        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <NoResults
            primaryText="No events found."
            secondaryText="Try adjusting the filters!"
            width="300"
            height="250"
          />
        )}
      </Paper>
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
            <Collapsable
              title="Filters"
              icon={<TuneIcon />}
              expanded={filtersExpanded}
              onToggle={onToggleFilters}
              smallOnly
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
                  <SportsAutocomplete
                    multiple
                    value={sports}
                    onChange={setSports}
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={excludeFull}
                        onChange={handleNotFullChange}
                        color="primary"
                        disabled={currentLocation.isLoading}
                      />
                    }
                    label="Exclude full"
                  />
                </Grid>
              </Grid>
            </Collapsable>
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
