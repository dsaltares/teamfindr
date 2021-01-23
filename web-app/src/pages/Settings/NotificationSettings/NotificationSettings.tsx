import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

const hasPermission = Notification.permission === 'granted';

const NotificationSettings = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  Push notifications
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  color="primary"
                  checked={hasPermission}
                  onChange={() => {}}
                  inputProps={{ 'aria-label': 'Push notifications' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Get push notifications to find out what's going when you're not on
              TeamFindr. You can turn them off anytime.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default React.memo(NotificationSettings);
