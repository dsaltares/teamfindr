import React from 'react';
import Slider from './Slider';

interface PlayerSliderProps {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
  name?: string;
  disabled?: boolean;
}

const PlayersSlider: React.FC<PlayerSliderProps> = ({
  id,
  value,
  onChange,
  name,
  disabled,
}) => (
  <Slider
    label="Number of players"
    id={id}
    step={1}
    min={2}
    max={30}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default React.memo(PlayersSlider);
