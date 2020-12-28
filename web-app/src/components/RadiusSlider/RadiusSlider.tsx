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
  return `${value}Km`;
}

const marks = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 5,
    label: '5km',
  },
  {
    value: 10,
    label: '10km',
  },
  {
    value: 20,
    label: '20km',
  },
  {
    value: 30,
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
        Radius (km)
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby={id}
        step={1}
        marks={marks}
        min={1}
        max={30}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(RadiusSlider);
