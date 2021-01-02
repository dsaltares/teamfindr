import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './PageTitle.styles';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

export interface PageTitleAction {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}

interface PageTitleProps {
  title?: string;
  action?: PageTitleAction;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, action }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        {title ? (
          <Typography variant="h6">{title}</Typography>
        ) : (
          <Skeleton width={200} variant="text" />
        )}
      </div>
      {action && (
        <div>
          <Button
            startIcon={action.icon}
            color="primary"
            variant="outlined"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(PageTitle);
