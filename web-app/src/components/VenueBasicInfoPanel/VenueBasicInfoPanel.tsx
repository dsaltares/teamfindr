import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Venue } from '../../types';
import Map from '../Map';
import useStyles from './VenueBasicInfoPanel.styles';
import getGoogleMapsUrl from '../../utils/getGoogleMapsUrl';
interface VenueBasicInfoPanelProps {
  venue?: Venue;
}

const VenueBasicInfoPanel: React.FC<VenueBasicInfoPanelProps> = ({ venue }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {venue ? (
            <img
              className={classes.venueImage}
              src={venue?.images[0]}
              alt="venue"
            />
          ) : (
            <Skeleton
              className={classes.venueImage}
              variant="rect"
              animation="pulse"
            />
          )}
        </Grid>
        <Grid item>
          <Link
            href={getGoogleMapsUrl(venue)}
            rel="nofollow noopener"
            target="_blank"
            color="inherit"
            underline="none"
          >
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item>
                <LocationOnIcon color="primary" />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    {venue ? (
                      <Typography variant="body1" color="textPrimary">
                        {venue.name}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" />
                    )}
                  </Grid>
                  <Grid item>
                    {venue ? (
                      <Typography variant="body2" color="textSecondary">
                        {venue.location.description}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Link>
        </Grid>
        <Grid item>
          <Map location={venue?.location || null} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(VenueBasicInfoPanel);
