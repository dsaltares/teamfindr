import React from 'react';
import Slider from './Slider';

interface DurationSliderProps {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
  name?: string;
  disabled?: boolean;
}

const valueText = (value: number) => `${value} min`;

const DurationSlider: React.FC<DurationSliderProps> = ({
  id,
  value,
  onChange,
  name,
  disabled,
}) => (
  <Slider
    label="Duration"
    id={id}
    valueText={valueText}
    step={15}
    min={15}
    max={120}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default React.memo(DurationSlider);
