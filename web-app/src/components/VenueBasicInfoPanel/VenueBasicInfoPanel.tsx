import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    <Card className={classes.card}>
      <CardActionArea
        component={Link}
        href={getGoogleMapsUrl(venue)}
        rel="nofollow noopener"
        target="_blank"
        color="inherit"
        underline="none"
        disabled={!venue}
      >
        <CardContent>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Typography color="textSecondary">
                <LocationOnIcon />
              </Typography>
            </Grid>
            <Grid item className={classes.address}>
              {venue ? (
                <Typography color="textSecondary">
                  {venue.location.description || venue.location.name}
                </Typography>
              ) : (
                <Skeleton variant="text" />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardMedia>
        <Map location={venue?.location || null} />
      </CardMedia>
    </Card>
  );
};

export default React.memo(VenueBasicInfoPanel);
