import React from 'react';

import type { Size } from './Avatar';
import Avatar from './Avatar';

const config = { title: 'Avatar' };

export const WithFullInfo = () => (
  <Avatar
    firstName="David"
    lastName="Saltares"
    avatar="https://res.cloudinary.com/teamfindr/image/upload/v1609008129/teamfindr/s65kgm1effpuothhvuir.jpg"
  />
);

export const NoImage = () => <Avatar firstName="David" lastName="Saltares" />;

export const Loading = () => (
  <Avatar firstName="David" lastName="Saltares" loading />
);

export const DifferentSizes = () => {
  const sizes: Size[] = ['small', 'medium', 'large'];
  return sizes.map((size) => (
    <Avatar
      key={size}
      firstName="David"
      lastName="Saltares"
      avatar="https://res.cloudinary.com/teamfindr/image/upload/v1609008129/teamfindr/s65kgm1effpuothhvuir.jpg"
      size={size}
    />
  ));
};

export default config;
