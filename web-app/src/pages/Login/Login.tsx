import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from '../../components/LoginButtons';
import useStyles from './Login.styles';
import { useLoginViaSocialMedia, useLocationQuery } from '../../hooks';
import { AuthProvider } from '../../types';

const LoginButtons = [
  {
    authProvider: 'google',
    Button: GoogleLoginButton,
  },
  {
    authProvider: 'facebook',
    Button: FacebookLoginButton,
  },
  {
    authProvider: 'twitter',
    Button: TwitterLoginButton,
  },
];

function Login() {
  const loginViaSocialMedia = useLoginViaSocialMedia();
  const { redirect } = useLocationQuery();
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
            {LoginButtons.map((loginButton) => (
              <Grid
                key={loginButton.authProvider}
                item
                className={classes.buttonContainer}
              >
                <loginButton.Button
                  onClick={() =>
                    loginViaSocialMedia(
                      loginButton.authProvider as AuthProvider,
                      redirect as string
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(Login);
