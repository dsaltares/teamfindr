import React from 'react';
import Grid from '@material-ui/core/Grid';
import HttpsIcon from '@material-ui/icons/Https';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from '@components/LoginButtons';
import { useLoginViaSocialMedia, useSearchQuery } from '@lib/hooks';
import type { AuthProvider } from '@lib/types';
import Policies from '@lib/utils/policies';
import useStyles from './Login.styles';

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

const PolicyLinks = [
  {
    key: 'privacy',
    label: 'Privacy policy',
    icon: <HttpsIcon />,
    href: Policies.Privacy,
  },
  {
    key: 'terms',
    label: 'Terms and conditions',
    icon: <GavelIcon />,
    href: Policies.Terms,
  },
  {
    key: 'cookie',
    label: 'Cookie policy',
    icon: <MenuBookIcon />,
    href: Policies.Cookies,
  },
];

const ActionMessages: Record<string, string> = {
  newEvent: 'Join TeamFindr to create new events',
  newVenue: 'Join TeamFindr to create new venues',
  joinEvent: 'Join TeamFindr to participate in events',
};

const LoginDialog: React.FC = () => {
  const classes = useStyles();
  const loginViaSocialMedia = useLoginViaSocialMedia();
  const { redirect, action } = useSearchQuery();
  const message = ActionMessages[action as string] || 'Join TeamFindr';

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      justify="center"
      spacing={4}
    >
      <Grid item className={classes.buttonsContainer}>
        <Grid container direction="column" spacing={1} alignItems="center">
          <Grid item className={classes.titleContainer}>
            <Typography variant="h3">{message}</Typography>
          </Grid>
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
      <Grid item>
        <Grid container direction="column" spacing={1}>
          {PolicyLinks.map((policy) => (
            <Grid item key={policy.key}>
              <Button
                className={classes.policyButton}
                component={Link}
                href={policy.href}
                startIcon={policy.icon}
              >
                {policy.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(LoginDialog);
