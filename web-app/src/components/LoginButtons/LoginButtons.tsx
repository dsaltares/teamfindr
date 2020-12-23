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

export const FacebookLoginButton: React.FC<LoginButtonProps> = React.memo(
  ({ onClick }) => {
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
  }
);

export const GoogleLoginButton: React.FC<LoginButtonProps> = React.memo(
  ({ onClick }) => {
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
  }
);

export const TwitterLoginButton: React.FC<LoginButtonProps> = React.memo(
  ({ onClick }) => {
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
  }
);
