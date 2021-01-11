import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
  const theme = useTheme();
  const showIconsOnly = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container>
      <Grid item>
        {title ? (
          <Typography variant="h6">{title}</Typography>
        ) : (
          <Skeleton width={200} variant="text" />
        )}
      </Grid>
      <Grid item>
        {actions.map((action) =>
          showIconsOnly || !action.label ? (
            <IconButton
              key={action.key}
              color="primary"
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.icon}
            </IconButton>
          ) : (
            <Button
              startIcon={action.icon}
              color="primary"
              variant="outlined"
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
