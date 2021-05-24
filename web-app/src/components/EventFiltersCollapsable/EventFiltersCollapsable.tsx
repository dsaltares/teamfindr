import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import CardActionArea from '@material-ui/core/CardActionArea';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './EventFiltersCollapsable.styles';
import FilterIcon from '../Icons/Filter.svg';
import { Sport, Location } from '../../types';
import Skeleton from '@material-ui/lab/Skeleton';

interface EventFiltersCollapsableProps {
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactElement;
  sports: Sport[];
  results?: number;
  radius?: number;
  location: Location | null;
}

const EventFiltersCollapsable: React.FC<EventFiltersCollapsableProps> = ({
  expanded,
  onToggle,
  children,
  sports,
  results,
  radius,
  location,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const content = (
    <div className={classes.content}>
      <Grid item>{children}</Grid>
    </div>
  );
  const wrappedContent = isSmall ? (
    <Collapse in={expanded}>{content}</Collapse>
  ) : (
    content
  );

  const eventLabel = results === 1 ? 'event' : 'events';
  const sportLabel =
    sports.length !== 1
      ? eventLabel
      : `${sports[0].toLowerCase()} ${eventLabel}`;
  const numberLabel = results === 0 ? 'No' : results;
  const resultsMsg =
    results !== undefined ? (
      <Typography variant="body1" color="textPrimary" component="div">
        {`${numberLabel} ${sportLabel}`}
      </Typography>
    ) : (
      <Skeleton variant="text" animation="pulse" width={100} />
    );

  const locationMsg =
    radius && location ? (
      <Typography variant="body2" color="primary" component="div">
        <div
          className={classes.bold}
        >{`${radius}km from ${location.name}`}</div>
      </Typography>
    ) : (
      <Skeleton variant="text" animation="pulse" width={150} />
    );

  const header = isSmall ? (
    <CardActionArea className={classes.header} onClick={onToggle}>
      <Grid item>
        <Grid
          container
          direction="row"
          alignContent="center"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>{resultsMsg}</Grid>
              <Grid item>{locationMsg}</Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="body2" color="primary" component="div">
                  <div className={classes.bold}>Filter</div>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.iconContainer}
                  variant="body2"
                  component="div"
                >
                  <FilterIcon fontSize="small" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardActionArea>
  ) : null;

  return (
    <Paper>
      <Grid container direction="column" spacing={0}>
        {header}
        {wrappedContent}
      </Grid>
    </Paper>
  );
};

export default React.memo(EventFiltersCollapsable);
