import React, { useState } from 'react';

import Counter from './Counter';

const config = { title: 'Counter' };

export const Default = () => {
  const [value, setValue] = useState<number | undefined>(10);
  return (
    <Counter
      value={value}
      onChange={setValue}
      min={2}
      max={30}
      step={1}
      name="radius"
      label="Radius (km)"
    />
  );
};

export default config;
