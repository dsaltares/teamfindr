import React, { useState } from 'react';

import DatePicker from './DatePicker';

const config = { title: 'DatePicker' };

export const Default = () => {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
};

export const WithValue = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return <DatePicker value={date} onChange={setDate} />;
};

export default config;
