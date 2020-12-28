import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import useStyles from './RadiusSlider.styles';

interface RadiusSliderProps {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
  name?: string;
}

function valuetext(value: number) {
  return `${Math.round(value / 1000)}km`;
}

const marks = [
  {
    value: 1000,
    label: '1km',
  },
  {
    value: 5000,
    label: '5km',
  },
  {
    value: 10000,
    label: '10km',
  },
  {
    value: 20000,
    label: '20km',
  },
  {
    value: 30000,
    label: '30km',
  },
];

const RadiusSlider: React.FC<RadiusSliderProps> = ({
  id,
  value,
  onChange,
  name,
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
        Radius: {`${valuetext(value)}`}
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby={id}
        step={1000}
        marks={marks}
        min={1000}
        max={30000}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(RadiusSlider);
