import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import { RadiusSlider } from '../../components/Slider';
import SportsAutocomplete from '../../components/SportsAutocomplete';
import DatePicker from '../../components/DatePicker';
import Skeleton from '@material-ui/lab/Skeleton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './Events.styles';
import { Location, Sport } from '../../types';
import { useCurrentLocation, useEvents } from '../../hooks';
import NewEventDialog from '../../components/NewEventDialog';
import EventList from './EventList';
import EventMarkers from './EventMarkers';

const Events = () => {
  const classes = useStyles();

  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [sports, setSports] = useState<Sport[]>([]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [excludeFull, setNotFull] = useState<boolean>(false);
  const currentLocation = useCurrentLocation();
  const { events, isLoading } = useEvents(
    location,
    radius,
    sports,
    date,
    excludeFull
  );

  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const handleNewEventDialogOpen = () => setNewEventDialogOpen(true);
  const handleNewEventDialogClose = () => setNewEventDialogOpen(false);

  const handleRadiusChange = (e: React.ChangeEvent<{}>, value: number) =>
    setRadius(value);

  const handleNotFullChange = (e: React.ChangeEvent<{}>, value: boolean) =>
    setNotFull(value);

  useEffect(() => {
    if (currentLocation.location && !location) {
      setLocation(currentLocation.location);
    }
  }, [currentLocation, location]);

  return (
    <>
      <Page
        title="Events"
        titleAction={{
          label: 'New event',
          icon: <AddIcon />,
          onClick: handleNewEventDialogOpen,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.filtersPaper}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <LocationWithMapField
                    location={location}
                    onChange={setLocation}
                    disabled={currentLocation.isLoading}
                    around={currentLocation.location?.geo.coordinates}
                    circleRadius={radius}
                    markers={<EventMarkers events={events} />}
                  />
                </Grid>
                <Grid item>
                  <RadiusSlider
                    id="venue-search-radius"
                    value={radius}
                    disabled={currentLocation.isLoading}
                    onChange={handleRadiusChange}
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {!events ? (
              <Skeleton width="100%" height="100%" variant="rect" />
            ) : (
              <Paper>{events && <EventList events={events} />}</Paper>
            )}
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
