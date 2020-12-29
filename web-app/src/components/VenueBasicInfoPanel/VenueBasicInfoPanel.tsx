import '../../App.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Venue } from '../../types';
import Map from '../Map';
import Typography from '@material-ui/core/Typography';

interface VenueBasicInfoPanelProps {
  venue: Venue;
}

const VenueBasicInfoPanel: React.FC<VenueBasicInfoPanelProps> = ({ venue }) => {
  const coords = venue.location.geo.coordinates;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords[1]},${coords[0]}`;

  return (
    <Card style={{ width: '100%' }}>
      <CardActionArea
        component={Link}
        href={googleMapsUrl}
        rel="nofollow noopener"
        target="_blank"
        color="inherit"
        underline="none"
      >
        <CardContent>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Typography color="textSecondary">
                <LocationOnIcon />
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                {venue.location.description || venue.location.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardMedia>
        <Map location={venue.location} />
      </CardMedia>
    </Card>
  );
};

export default React.memo(VenueBasicInfoPanel);
