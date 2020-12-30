import React, { useState } from 'react';

import SportsAutocomplete from './SportsAutocomplete';

const config = { title: 'SportsAutocomplete' };

export const Default = () => {
  const [value, setValue] = useState<string[] | string | null>([]);
  return <SportsAutocomplete value={value} onChange={setValue} />;
};

export default config;
