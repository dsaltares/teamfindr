import React from 'react';
import DialogActionsBase from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './DialogActions.styles';

interface Action {
  key: string;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'submit';
  danger?: boolean;
}

interface DialogActionProps {
  actions: Action[];
  loading?: boolean;
}

const DialogActions: React.FC<DialogActionProps> = ({
  actions,
  loading = false,
}) => {
  const classes = useStyles();
  return (
    <DialogActionsBase className={classes.actions}>
      {actions.map((action) => (
        <Button
          key={action.key}
          type={action.type}
          onClick={action.onClick}
          color={!action.danger ? 'primary' : undefined}
          variant="contained"
          disabled={action.disabled || loading}
          className={action.danger ? classes.dangerButton : undefined}
        >
          {action.loading ? <CircularProgress size={24} /> : action.label}
        </Button>
      ))}
    </DialogActionsBase>
  );
};

export default React.memo(DialogActions);
