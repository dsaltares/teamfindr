import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './Counter.styles';

interface CounterProps {
  value?: number;
  onChange?: (value?: number) => void;
  min: number;
  max: number;
  step: number;
  name?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  name,
  label,
  disabled,
  error,
  onBlur,
}) => {
  const classes = useStyles();

  const setValue = (newValue?: number) => {
    if (onChange) {
      onChange(newValue !== undefined ? clamp(newValue, min, max) : newValue);
    }
  };
  const onIncrement = () => setValue(value !== undefined ? value + step : min);
  const onDecrement = () => setValue(value !== undefined ? value - step : min);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
    onChange(value);
  };

  return (
    <div>
      <TextField
        name={name}
        inputProps={{
          style: { textAlign: 'center' },
          min,
          max,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className={classes.button}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={onDecrement}
                  disabled={disabled}
                >
                  <RemoveIcon />
                </IconButton>
              </div>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <div className={classes.button}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={onIncrement}
                  disabled={disabled}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </InputAdornment>
          ),
        }}
        value={value !== undefined ? value : ''}
        onChange={handleChange}
        label={label}
        type="number"
        disabled={disabled}
        error={error}
        onBlur={onBlur}
      />
    </div>
  );
};

export default React.memo(Counter);
