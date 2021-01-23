import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  disablePast?: boolean;
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabled,
  disablePast,
  label,
}) => {
  return (
    <KeyboardDatePicker
      autoOk
      fullWidth
      inputVariant="outlined"
      label={label}
      clearable
      disablePast={disablePast}
      value={value}
      onChange={onChange}
      format="yyyy/MM/dd"
      placeholder="yyyy/mm/dd"
      disabled={disabled}
      margin="dense"
    />
  );
};
export default React.memo(DatePicker);
