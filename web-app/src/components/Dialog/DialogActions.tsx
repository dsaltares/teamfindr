import React from 'react';
import DialogActionsBase from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Action {
  key: string;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

interface DialogActionProps {
  actions: Action[];
  loading?: boolean;
}

const DialogActions: React.FC<DialogActionProps> = ({
  actions,
  loading = false,
}) => (
  <DialogActionsBase>
    {actions.map((action) => (
      <Button
        key={action.key}
        onClick={action.onClick}
        color="primary"
        disabled={action.disabled || loading}
      >
        {action.loading ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          action.label
        )}
      </Button>
    ))}
  </DialogActionsBase>
);

export default React.memo(DialogActions);
