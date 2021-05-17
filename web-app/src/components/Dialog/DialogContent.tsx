import React from 'react';
import DialogContentBase from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import useStyles from './DialogContent.styles';

interface DialogContentProps {
  children: React.ReactNode;
}

const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <DialogContentBase className={classes.content}>
      <Paper className={classes.paper}>{children}</Paper>
    </DialogContentBase>
  );
};

export default React.memo(DialogContent);
