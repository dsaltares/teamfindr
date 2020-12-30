import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import MuiSlider from '@material-ui/core/Slider';
import useStyles from './Slider.styles';

interface Mark {
  value: number;
  label: string;
}

type Marks = Mark[];

interface SliderProps {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
  name?: string;
  disabled?: boolean;
  valueText?: (value: number) => string;
  marks?: Marks;
  label: string;
  step: number;
  min: number;
  max: number;
}

const Slider: React.FC<SliderProps> = ({
  id,
  value,
  onChange,
  name,
  disabled,
  valueText = (value) => value.toString(),
  marks,
  label,
  step,
  min,
  max,
}) => {
  const classes = useStyles();
  const handleChange = useCallback(
    (e: React.ChangeEvent<{}>, value: number | number[]) => {
      onChange(e, value as number);
    },
    [onChange]
  );
  return (
    <div className={classes.root}>
      <Typography id={id} gutterBottom>
        {label}: {`${valueText(value)}`}
      </Typography>
      <div className={classes.sliderContainer}>
        <MuiSlider
          getAriaValueText={valueText}
          aria-labelledby={id}
          step={step}
          marks={marks}
          min={min}
          max={max}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default React.memo(Slider);
