import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Image from 'next/image';
import useStyles from './PageTitle.styles';

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
  smallScreenTitle?: string;
  actions: PageTitleAction[];
  showLogo?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  smallScreenTitle,
  actions,
  showLogo,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={clsx(
        classes.titleContainer,
        smallScreen && classes.mobileTitleContainer
      )}
    >
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={2}>
          {smallScreen && showLogo && (
            <Grid item className={classes.flex}>
              <Image
                alt=""
                src="/logo.svg"
                aria-hidden="true"
                width={32}
                height={32}
              />
            </Grid>
          )}
          <Grid item>
            {title ? (
              <Typography variant="h6">
                <div className={classes.bold}>
                  {smallScreen && smallScreenTitle ? smallScreenTitle : title}
                </div>
              </Typography>
            ) : (
              <Skeleton width={200} variant="text" />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {actions.map((action) =>
          !action.label ? (
            <IconButton
              key={action.key}
              className={clsx(
                classes.button,
                action.danger && classes.dangerButton
              )}
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
              className={clsx(
                classes.button,
                action.danger && classes.dangerButton
              )}
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
