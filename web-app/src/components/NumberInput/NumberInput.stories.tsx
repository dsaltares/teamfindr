import React, { useState } from 'react';

import NumberInput from './NumberInput';

const config = { title: 'NumberInput' };

export const Default = () => {
  const [value, setValue] = useState<number>(10);
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      label="Radius"
      unitLabel="km"
      min={1}
      max={30}
    />
  );
};

export default config;
