import React from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string | false;
  disablePast?: boolean;
  label?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  disabled,
  onBlur,
  name,
  required,
  error,
  helperText,
  disablePast,
  label,
}) => (
    <KeyboardDateTimePicker
      name={name}
      autoOk
      disablePast={disablePast}
      fullWidth
      ampm={false}
      error={error}
      helperText={helperText}
      required={required}
      inputVariant="outlined"
      label={label}
      clearable
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy HH:mm"
      placeholder="dd/mm/yyyy hh:mm"
      disabled={disabled}
      onBlur={onBlur}
      margin="dense"
    />
  );
export default React.memo(DateTimePicker);
