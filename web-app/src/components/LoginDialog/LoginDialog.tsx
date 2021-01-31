import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import HttpsIcon from '@material-ui/icons/Https';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import Dialog, { DialogContent } from '../Dialog';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from '../../components/LoginButtons';
import { useLoginViaSocialMedia, useLocationQuery } from '../../hooks';
import { AuthProvider } from '../../types';
import useStyles from './LoginDialog.styles';
import Policies from '../../utils/policies';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

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

const LoginDialog: React.FC = () => {
  const loginViaSocialMedia = useLoginViaSocialMedia();
  const { redirect } = useLocationQuery();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Dialog
      id="login-dialog"
      title="Join Team Findr"
      open={true}
      onClose={() => history.goBack()}
    >
      <DialogContent>
        <Grid
          className={classes.container}
          container
          direction="column"
          alignContent="center"
          alignItems="center"
          justify="space-between"
          spacing={2}
        >
          <Grid item className={classes.buttonsContainer}>
            <Grid container direction="column" spacing={1}>
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
                    target="_blank"
                    rel="nofollow noreferrer"
                    underline="none"
                    color="inherit"
                    startIcon={policy.icon}
                  >
                    {policy.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
