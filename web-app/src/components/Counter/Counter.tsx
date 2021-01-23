import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from './Counter.styles';
import TextField from '@material-ui/core/TextField';

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
    <div className={classes.container}>
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
      <TextField
        fullWidth
        name={name}
        inputProps={{
          style: { textAlign: 'center' },
          min,
          max,
        }}
        value={value !== undefined ? value : ''}
        onChange={handleChange}
        label={label}
        type="number"
        variant="outlined"
        margin="dense"
        disabled={disabled}
        error={error}
        onBlur={onBlur}
      />
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
    </div>
  );
};

export default React.memo(Counter);
