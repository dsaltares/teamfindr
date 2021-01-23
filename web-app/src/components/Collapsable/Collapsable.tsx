import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import CardActionArea from '@material-ui/core/CardActionArea';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './Collapsable.styles';

interface CollapsableProps {
  title: string;
  icon: React.ReactElement;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactElement;
  smallOnly: boolean;
}

const Collapsable: React.FC<CollapsableProps> = ({
  title,
  icon,
  expanded,
  onToggle,
  children,
  smallOnly,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const showCollapsable = isSmall || !smallOnly;
  const classes = useStyles();

  const content = (
    <div className={classes.content}>
      <Grid item>{children}</Grid>
    </div>
  );
  const wrappedContent = showCollapsable ? (
    <Collapse in={expanded}>{content}</Collapse>
  ) : (
    content
  );

  const header = showCollapsable ? (
    <CardActionArea onClick={onToggle}>
      <div className={classes.content}>
        <Grid item>
          <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                alignContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography
                    className={classes.iconContainer}
                    variant="body1"
                    color="textSecondary"
                    component="div"
                  >
                    {icon}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="div"
                  >
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                className={classes.iconContainer}
                variant="body1"
                color="primary"
                component="div"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider />
    </CardActionArea>
  ) : null;

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" spacing={0}>
        {header}
        {wrappedContent}
      </Grid>
    </Paper>
  );
};

export default React.memo(Collapsable);
