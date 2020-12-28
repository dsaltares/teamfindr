import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import RadiusSlider from '../../components/RadiusSlider';
import NewVenueDialog from '../../components/NewVenueDialog';
import { Location } from '../../types';
import { useCurrentLocation } from '../../hooks';

const Venues = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number>(5);
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

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Venues</Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              onClick={handleNewVenueDialogOpen}
            >
              New venue
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <LocationWithMapField
                  location={location}
                  onChange={setLocation}
                  disabled={currentLocation.isLoading}
                  around={currentLocation.location?.geo.coordinates}
                  restrictToType="city"
                />
              </Grid>
              <Grid item>
                <RadiusSlider
                  id="venue-search-radius"
                  value={radius}
                  onChange={handleRadiusChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            Results
          </Grid>
        </Grid>
      </Grid>
      <NewVenueDialog
        open={newVenueDialogOpen}
        onClose={handleNewVenueDialogClose}
      />
    </Grid>
  );
};

export default React.memo(Venues);
