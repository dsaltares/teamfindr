/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './FeatureCard.styles';

interface FeatureCardProps {
  image: string;
  message: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ image, message }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div>
        <img className={classes.media} aria-hidden="true" src={image} />
      </div>
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(FeatureCard);
