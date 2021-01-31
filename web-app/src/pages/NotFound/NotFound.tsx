/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './NotFound.styles';
import NotFoundImg from './undraw_not_found.svg';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        className={classes.root}
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"
        spacing={4}
      >
        <Grid item>
          <Typography variant="h6">
            Oops! There is nothing to see here.
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <img className={classes.image} aria-hidden="true" src={NotFoundImg} />
        </Grid>
        <Grid item>
          <Button component={Link} to="/" variant="outlined" color="primary">
            Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(NotFound);
