import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './PageTitle.styles';
import Button from '@material-ui/core/Button';

export interface PageTitleAction {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}

interface PageTitleProps {
  title: string;
  action?: PageTitleAction;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, action }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h4">{title}</Typography>
      </div>
      {action && (
        <div>
          <Button
            startIcon={action.icon}
            color="primary"
            variant="contained"
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
