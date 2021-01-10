import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './PageTitle.styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

export interface PageTitleAction {
  label?: string;
  icon: React.ReactElement;
  disabled?: boolean;
  onClick: () => void;
}

interface PageTitleProps {
  title?: string;
  action?: PageTitleAction;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, action }) => {
  const classes = useStyles();

  let actionEl = null;
  if (action && action.label) {
    actionEl = (
      <div>
        <Button
          startIcon={action.icon}
          color="primary"
          variant="outlined"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      </div>
    );
  } else if (action) {
    actionEl = (
      <div>
        <IconButton
          color="primary"
          disabled={action.disabled}
          onClick={action.onClick}
        >
          {action.icon}
        </IconButton>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div>
        {title ? (
          <Typography variant="h6">{title}</Typography>
        ) : (
          <Skeleton width={200} variant="text" />
        )}
      </div>
      {actionEl}
    </div>
  );
};

export default React.memo(PageTitle);
