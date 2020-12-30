import React, { useState } from 'react';

import DateTimePicker from './DateTimePicker';

const config = { title: 'DateTimePicker' };

export const Default = () => {
  const [date, setDate] = useState<Date | null>(null);
  return <DateTimePicker value={date} onChange={setDate} />;
};

export const WithValue = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return <DateTimePicker value={date} onChange={setDate} />;
};

export default config;
