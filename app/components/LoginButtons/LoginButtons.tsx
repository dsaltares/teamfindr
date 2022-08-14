import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '../GoogleIcon';
import useStyles from './LoginButtons.styles';

interface LoginButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FacebookLoginButtonBase: React.FC<LoginButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: clsx(classes.baseRoot, classes.facebookRoot),
      }}
      startIcon={<FacebookIcon />}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth
    >
      Join with Facebook
    </Button>
  );
};

const GoogleLoginButtonBase: React.FC<LoginButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: clsx(classes.baseRoot, classes.googleRoot),
      }}
      startIcon={<GoogleIcon />}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth
    >
      Join with Google
    </Button>
  );
};

const TwitterLoginButtonBase: React.FC<LoginButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: clsx(classes.baseRoot, classes.twitterRoot),
      }}
      startIcon={<TwitterIcon />}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth
    >
      Join with Twitter
    </Button>
  );
};

export const FacebookLoginButton = React.memo(FacebookLoginButtonBase);
export const TwitterLoginButton = React.memo(TwitterLoginButtonBase);
export const GoogleLoginButton = React.memo(GoogleLoginButtonBase);
