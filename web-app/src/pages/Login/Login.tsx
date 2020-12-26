import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from '../../components/LoginButtons';
import useStyles from './Login.styles';
import { useLoginViaSocialMedia } from '../../queries';

function Login() {
  const loginViaSocialMedia = useLoginViaSocialMedia();
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
          justify="center"
          spacing={8}
        >
          <Grid item>
            <Typography variant="h2">Team Findr</Typography>
          </Grid>
          <Grid
            className={classes.buttonsContainer}
            container
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Grid item className={classes.buttonContainer}>
              <TwitterLoginButton
                onClick={() => loginViaSocialMedia('twitter')}
              />
            </Grid>
            <Grid item className={classes.buttonContainer}>
              <FacebookLoginButton
                onClick={() => loginViaSocialMedia('facebook')}
              />
            </Grid>
            <Grid item className={classes.buttonContainer}>
              <GoogleLoginButton
                onClick={() => loginViaSocialMedia('google')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(Login);
