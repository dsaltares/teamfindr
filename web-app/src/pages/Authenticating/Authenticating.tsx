import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './Authenticating.styles';

const Authenticating = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      alignContent="center"
      justify="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default React.memo(Authenticating);
