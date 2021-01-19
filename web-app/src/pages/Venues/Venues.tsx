import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from '../../components/Page';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import NewVenueDialog from '../../components/NewVenueDialog';
import { Location } from '../../types';
import { useCurrentLocation, useVenues } from '../../hooks';
import VenueList from './VenueList';
import VenueMarkers from './VenueMarkers';
import useStyles from './Venues.styles';

const Venues = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const { venues } = useVenues(location, radius);
  const currentLocation = useCurrentLocation();
  const [newVenueDialogOpen, setNewVenueDialogOpen] = useState(false);
  const handleNewVenueDialogClose = () => setNewVenueDialogOpen(false);
  const handleNewVenueDialogOpen = () => setNewVenueDialogOpen(true);

  const handleRadiusChange = (e: React.ChangeEvent<{}>, value: number) =>
    setRadius(value);

  useEffect(() => {
    if (currentLocation.location && !location) {
      setLocation(currentLocation.location);
    }
  }, [currentLocation, location]);

  const classes = useStyles();

  return (
    <Page
      title="Venues"
      titleActions={[
        {
          key: 'newVenue',
          label: 'New venue',
          icon: <AddIcon />,
          onClick: handleNewVenueDialogOpen,
        },
      ]}
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
                  onRadiusChange={handleRadiusChange}
                  markers={<VenueMarkers venues={venues} />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {!venues ? (
            <Skeleton width="100%" height="100%" variant="rect" />
          ) : (
            <Paper className={classes.venuesPaper}>
              {venues && <VenueList venues={venues} />}
            </Paper>
          )}
        </Grid>
        <NewVenueDialog
          open={newVenueDialogOpen}
          onClose={handleNewVenueDialogClose}
        />
      </Grid>
    </Page>
  );
};

export default React.memo(Venues);
