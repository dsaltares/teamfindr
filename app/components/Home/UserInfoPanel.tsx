import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Avatar from '@components/Avatar';
import { useUser, useCurrentLocation, useLocationPermission } from '@lib/hooks';
import type { Location } from '@lib/types';

const getCityCountry = (location: Location) => {
  const props: (keyof Location)[] = ['city', 'country'];
  const str = props
    .map((prop) => location[prop])
    .filter((value) => !!value)
    .join(', ');
  return str || 'unknown';
};

const UserInfoPanel = () => {
  const { user } = useUser();
  const { location } = useCurrentLocation();
  const { permission, request, requesting } = useLocationPermission();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar
          size="xLarge"
          firstName={user?.firstName}
          lastName={user?.lastName}
          avatar={user?.avatar}
          loading={!user}
        />
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <Typography color="primary">
              <LocationOnIcon />
            </Typography>
          </Grid>
          <Grid item>
            {location ? (
              <Typography variant="body2" color="textSecondary">
                {getCityCountry(location)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {permission === 'prompt' && (
          <Button
            startIcon={<GpsFixedIcon />}
            color="primary"
            variant="outlined"
            onClick={request}
            disabled={requesting}
          >
            Improve location accuracy
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(UserInfoPanel);
