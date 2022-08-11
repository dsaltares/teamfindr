import React from 'react';
import useStyles from './DialogForm.styles';

interface DialogFormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const DialogForm: React.FC<DialogFormProps> = ({ children, onSubmit }) => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default React.memo(DialogForm);
