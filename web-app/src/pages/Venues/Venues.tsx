import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from '../../components/Page';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import NewVenueDialog from '../../components/NewVenueDialog';
import { Location } from '../../types';
import { useCurrentLocation, useUser, useVenues } from '../../hooks';
import VenueList from './VenueList';
import VenueMarkers from './VenueMarkers';
import useStyles from './Venues.styles';
import NoResults from '../../components/NoResults';

const Venues = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number | undefined>(5);
  const { venues } = useVenues(location, radius);
  const { user } = useUser();
  const currentLocation = useCurrentLocation();
  const [newVenueDialogOpen, setNewVenueDialogOpen] = useState(false);
  const handleNewVenueDialogClose = () => setNewVenueDialogOpen(false);
  const handleNewVenueDialogOpen = () => setNewVenueDialogOpen(true);

  useEffect(() => {
    if (currentLocation.location && !location) {
      setLocation(currentLocation.location);
    }
  }, [currentLocation, location]);

  const classes = useStyles();

  let venueContent = null;
  if (!venues) {
    venueContent = <Skeleton width="100%" height={200} variant="rect" />;
  } else {
    venueContent = (
      <Paper className={classes.venuesPaper}>
        {venues.length > 0 ? (
          <VenueList venues={venues} />
        ) : (
          <NoResults
            primaryText="No venues found."
            secondaryText="Try adjusting the filters!"
            width="300"
            height="250"
          />
        )}
      </Paper>
    );
  }

  const isAdmin = user && user.roles.includes('admin');
  const titleActions = isAdmin
    ? [
        {
          key: 'newVenue',
          label: 'New venue',
          icon: <AddIcon />,
          onClick: handleNewVenueDialogOpen,
        },
      ]
    : [];

  return (
    <Page title="Venues" titleActions={titleActions}>
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
                  onRadiusChange={setRadius}
                  markers={<VenueMarkers venues={venues} />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {venueContent}
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
