import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router';
import Page from '@components/Page';
import LocationWithMapField from '@components/NewVenueDialog/LocationWithMapField';
import NewVenueDialog from '@components/NewVenueDialog';
import type { Location } from '@lib/types';
import { useCurrentLocation, useUser, useVenues } from '@lib/hooks';
import VenueMarkers from '@components/VenueMarkers';
import NoResults from '@components/NoResults';
import VenueList from './VenueList';
import useStyles from './Venues.styles';

const Venues = () => {
  const { user } = useUser();
  const history = useHistory();
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number | undefined>(5);
  const { venues } = useVenues(location, radius);
  const currentLocation = useCurrentLocation();
  const [newVenueDialogOpen, setNewVenueDialogOpen] = useState(false);
  const handleNewVenueDialogClose = () => setNewVenueDialogOpen(false);
  const handleNewVenueDialogOpen = () => {
    if (user) {
      setNewVenueDialogOpen(true);
    } else {
      history.push(
        `/login?redirect=${encodeURIComponent(
          window.location.href
        )}&action=newVenue`
      );
    }
  };

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
      <Paper className={classes.venues}>
        {venues.length > 0 ? (
          <VenueList venues={venues} />
        ) : (
          <NoResults
            primaryText="No venues found."
            secondaryText="Try adjusting the filters!"
            width="131"
            height="100"
          />
        )}
      </Paper>
    );
  }

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
          <Paper className={classes.filters}>
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
