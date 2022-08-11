import React, { useState } from 'react';
import type { Sport } from '@lib/types';

import SportsAutocomplete from './SportsAutocomplete';

const config = { title: 'SportsAutocomplete' };

export const Default = () => {
  const [value, setValue] = useState<Sport[] | Sport | null>([]);
  return <SportsAutocomplete value={value} onChange={setValue} />;
};

export default config;
