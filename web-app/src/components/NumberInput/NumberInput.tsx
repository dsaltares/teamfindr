import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

interface NumberInputProps {
  value: number;
  onChange?: (value: number) => void;
  name?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  unitLabel?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  name,
  disabled,
  max,
  min,
  error,
  helperText,
  label,
  unitLabel,
  onBlur,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) {
        return;
      }
      const value = e.target.value ? parseInt(e.target.value, 10) : 0;
      onChange(clamp(value, min || 1, max || 100));
    },
    [onChange, min, max]
  );

  return (
    <TextField
      fullWidth
      size="small"
      name={name}
      value={value}
      label={label}
      type="number"
      variant="outlined"
      onChange={handleChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      margin="dense"
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{unitLabel}</InputAdornment>
        ),
      }}
    />
  );
};

export default React.memo(NumberInput);
