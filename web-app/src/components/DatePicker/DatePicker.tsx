import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <KeyboardDatePicker
      autoOk
      fullWidth
      inputVariant="outlined"
      label="Date"
      clearable
      disableFuture
      value={value}
      onChange={onChange}
      format="yyyy/MM/dd"
      placeholder="yyyy/mm/dd"
      disabled={disabled}
    />
  );
};
export default React.memo(DatePicker);
