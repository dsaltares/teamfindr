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
}) => {
  return (
    <KeyboardDateTimePicker
      name={name}
      autoOk
      disablePast={disablePast}
      fullWidth
      error={error}
      helperText={helperText}
      required={required}
      inputVariant="outlined"
      label="Date & time"
      clearable
      value={value}
      onChange={onChange}
      format="yyyy/MM/dd HH:mm"
      placeholder="yyyy/mm/dd hh:mm"
      disabled={disabled}
      onBlur={onBlur}
    />
  );
};
export default React.memo(DateTimePicker);
