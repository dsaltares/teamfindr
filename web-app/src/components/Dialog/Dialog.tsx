import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogBase from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './Dialog.styles';

interface Action {
  key: string;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

interface DialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  content: JSX.Element;
  actions: Action[];
}

const Dialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = `${id}-title`;
  const classes = useStyles();

  const reversedActions = actions.slice();
  reversedActions.reverse();

  const loading = actions.some((action) => !!action.loading);

  return (
    <DialogBase
      classes={{
        paper: !fullScreen ? classes.dialogPaper : undefined,
      }}
      fullScreen={fullScreen}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      onClose={onClose}
      aria-labelledby={titleId}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={titleId} className={classes.title} disableTypography>
        <Typography variant="h6">{title}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
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
      </DialogActions>
    </DialogBase>
  );
};

export default React.memo(Dialog);
