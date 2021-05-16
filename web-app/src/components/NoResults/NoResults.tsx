import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './NoResults.styles';
import { ReactComponent as NoResultsImg } from './no_results.svg';

interface NoResultsProps {
  primaryText: string;
  secondaryText?: string;
  width: string;
  height: string;
}

const NoResults: React.FC<NoResultsProps> = ({
  primaryText,
  secondaryText,
  width,
  height,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={1}
      className={classes.container}
    >
      <Grid item>
        <NoResultsImg aria-hidden="true" width={width} height={height} />
      </Grid>
      <Grid item>
        <Typography variant="body1">{primaryText}</Typography>
      </Grid>
      {secondaryText && (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {secondaryText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(NoResults);
