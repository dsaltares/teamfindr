import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LocationAutoComplete from '../../components/LocationAutocomplete';
import { LocationSuggestion } from '../../utils/getLocationSuggestions';

const Venues = () => {
  const [result, setResult] = useState<LocationSuggestion | null>(null);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Venues</Typography>
          </Grid>
          <Grid item>
            <Button startIcon={<AddIcon />} color="primary" variant="contained">
              New venue
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LocationAutoComplete value={result} onChange={setResult} />
          </Grid>
          <Grid item xs={12} md={6}>
            Results
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Venues);
