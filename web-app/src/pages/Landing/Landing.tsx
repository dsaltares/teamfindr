/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './Landing.styles';
import BasketballImg from './undraw_basketball.svg';
import FootballImg from './undraw_soccer.svg';
import TennisImg from './undraw_tennis.svg';
import FeatureCard from './FeatureCard';
import LoginDialog from '../../components/LoginDialog';

const Features = [
  {
    key: 'basket',
    image: BasketballImg,
    message: 'Missing players? Find people to join your game!',
  },
  {
    key: 'football',
    image: FootballImg,
    message: 'New in the city? Find people to play with and make new friends!',
  },
  {
    key: 'tennis',
    image: TennisImg,
    message: 'Playing just amongst friends? Create private events!',
  },
];

const Landing: React.FC = () => {
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
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h2">Team Findr</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              Play sports anytime
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Get started
        </Button>
      </Grid>

      <Grid item xs={8} sm={10} className={classes.cardContainer}>
        <Grid container direction="row" justify="space-between" spacing={3}>
          {Features.map((feature) => (
            <Grid item key={feature.key} xs={12} sm={4}>
              <FeatureCard image={feature.image} message={feature.message} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Switch>
        <Route path="/login" exact component={LoginDialog} />
      </Switch>
    </Grid>
  );
};

export default React.memo(Landing);
