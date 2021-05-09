import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './PageTitle.styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

export interface PageTitleAction {
  key: string;
  label?: string;
  icon: React.ReactElement;
  disabled?: boolean;
  danger?: boolean;
  onClick: () => void;
}
interface PageTitleProps {
  title?: string;
  actions: PageTitleAction[];
}

const PageTitle: React.FC<PageTitleProps> = ({ title, actions }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item>
        {title ? (
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">{title}</Box>
          </Typography>
        ) : (
          <Skeleton width={200} variant="text" />
        )}
      </Grid>
      <Grid item>
        {actions.map((action) =>
          !action.label ? (
            <IconButton
              key={action.key}
              className={action.danger ? classes.dangerButton : undefined}
              color="primary"
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.icon}
            </IconButton>
          ) : (
            <Button
              key={action.key}
              startIcon={action.icon}
              className={action.danger ? classes.dangerButton : undefined}
              color="primary"
              variant="text"
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(PageTitle);
