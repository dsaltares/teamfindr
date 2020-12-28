import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
// import { Scrollbars } from 'react-custom-scrollbars';
// import { AutoSizer } from 'react-virtualized';
import LocationWithMapField from '../../components/NewVenueDialog/LocationWithMapField';
import RadiusSlider from '../../components/RadiusSlider';
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
            <Paper className={classes.filtersPaper}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <LocationWithMapField
                    location={location}
                    onChange={setLocation}
                    disabled={currentLocation.isLoading}
                    around={currentLocation.location?.geo.coordinates}
                    circleRadius={radius}
                    markers={<VenueMarkers venues={venues} />}
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {!venues ? (
              <Skeleton width="100%" height="100%" variant="rect" />
            ) : (
              <Paper style={{ height: '100%' }}>
                {/* {venues && (
              <AutoSizer>
                {({ height }) => {
                  console.log('height', height);
                  return (
                    <Scrollbars autoHide height={height}>
                      <VenueList venues={venues} />
                    </Scrollbars>
                  );
                }}
              </AutoSizer>
            )} */}
                {venues && <VenueList venues={venues} />}
              </Paper>
            )}
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
