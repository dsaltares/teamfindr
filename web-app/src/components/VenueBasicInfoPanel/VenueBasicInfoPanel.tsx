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
          <img
            className={classes.venueImage}
            src="https://scontent.fclj2-1.fna.fbcdn.net/v/t1.6435-9/106371406_3091783634236528_3551108379228035343_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=e3f864&_nc_ohc=zuBxzdF-jzkAX_IWMsH&_nc_ht=scontent.fclj2-1.fna&oh=6c8a403c02b5c2366512e653d3a0dd07&oe=60BC1AD0"
            alt="venue"
          />
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
