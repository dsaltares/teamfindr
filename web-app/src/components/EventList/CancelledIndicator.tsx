import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './CancelledIndicator.styles';

const CancelledIndicator: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="body2">
        <div className={classes.text}>Cancelled event</div>
      </Typography>
    </div>
  );
};

export default React.memo(CancelledIndicator);
