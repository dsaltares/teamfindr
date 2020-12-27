import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LocationAutoComplete from '../../components/LocationAutocomplete';
import NewVenueDialog from '../../components/NewVenueDialog';
import { Location } from '../../types';
import { useCurrentLocation } from '../../hooks';

const Venues = () => {
  const [result, setResult] = useState<Location | null>(null);
  const currentLocation = useCurrentLocation();
  const [newVenueDialogOpen, setNewVenueDialogOpen] = useState(false);
  const handleNewVenueDialogClose = () => setNewVenueDialogOpen(false);
  const handleNewVenueDialogOpen = () => setNewVenueDialogOpen(true);

  useEffect(() => {
    if (currentLocation.location && !result) {
      setResult(currentLocation.location);
    }
  }, [currentLocation, result]);

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LocationAutoComplete
              value={result}
              onChange={setResult}
              disabled={currentLocation.isLoading}
            />
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
