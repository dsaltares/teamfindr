import React from 'react';
import DialogContentBase from '@material-ui/core/DialogContent';

interface DialogContentProps {
  children: React.ReactNode;
}

const DialogContent: React.FC<DialogContentProps> = ({ children }) => (
  <DialogContentBase dividers>{children}</DialogContentBase>
);

export default React.memo(DialogContent);
