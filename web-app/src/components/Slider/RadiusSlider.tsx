import React from 'react';
import Slider from './Slider';

interface RadiusSliderProps {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
  name?: string;
  disabled?: boolean;
}

function valueText(value: number) {
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
  disabled,
}) => (
  <Slider
    label="Radius"
    id={id}
    valueText={valueText}
    step={1000}
    marks={marks}
    min={1000}
    max={30000}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default React.memo(RadiusSlider);
