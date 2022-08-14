import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import type { Sport } from '@lib/types';
import sportIcons from '@lib/utils/sportIcons';
import useStyles from './SportButton.styles';

interface SportButtonProps {
  sport: Sport;
}

const SportButton: React.FC<SportButtonProps> = ({ sport }) => {
  const classes = useStyles();
  const Icon = sportIcons[sport];
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          className={classes.link}
          to={`/events?sport=${sport}`}
          color="inherit"
        >
          <CardContent className={classes.cardContent}>
            <Typography component="div" variant="h3">
              <Icon />
            </Typography>
            <Typography variant="body1" color="primary" component="div">
              {sport}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(SportButton);
