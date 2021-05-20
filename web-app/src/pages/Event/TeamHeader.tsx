import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './TeamHeader.styles';

interface TeamHeaderProps {
  name: string;
  participants: number;
  capacity: number;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({
  name,
  participants,
  capacity,
}) => {
  const classes = useStyles();
  const spacesAvailable = capacity - participants;
  const pluralizedSpace = spacesAvailable > 1 ? 'spaces' : 'space';

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1" color="textPrimary">
          <div className={classes.bold}>{name}</div>
        </Typography>
      </Grid>
      <Grid item>
        {spacesAvailable <= 0 ? (
          <Typography variant="body1" color="primary">
            Team full
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="primary" component="span">
              {spacesAvailable}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="span">
              {` ${pluralizedSpace} available`}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(TeamHeader);
