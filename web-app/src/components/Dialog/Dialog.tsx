import React from 'react';
import cslx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogBase from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './Dialog.styles';

interface DialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  loading?: boolean;
  children: React.ReactNode;
  maxWidth?: 'small' | 'medium' | 'large';
}

const Dialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
  title,
  children,
  loading = false,
  maxWidth = 'medium',
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = `${id}-title`;
  const classes = useStyles();

  return (
    <DialogBase
      classes={{
        paper: cslx(classes[maxWidth], !isSmallScreen && classes.dialogPaper),
      }}
      fullScreen={isSmallScreen}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      onClose={onClose}
      aria-labelledby={titleId}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={titleId} className={classes.title}>
        <Typography variant="h6" color="textPrimary" component="div">
          <div className={classes.bold}>{title}</div>
        </Typography>
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
      {open && children}
    </DialogBase>
  );
};

export default React.memo(Dialog);
