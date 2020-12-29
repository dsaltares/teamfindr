import React from 'react';

import Avatar, { Size } from './Avatar';

const config = { title: 'Avatar' };

export const WithFullInfo = () => {
  return (
    <Avatar
      firstName="David"
      lastName="Saltares"
      avatar="https://res.cloudinary.com/teamfindr/image/upload/v1609008129/teamfindr/s65kgm1effpuothhvuir.jpg"
    />
  );
};

export const NoImage = () => {
  return <Avatar firstName="David" lastName="Saltares" />;
};

export const Loading = () => {
  return <Avatar firstName="David" lastName="Saltares" loading />;
};

export const DifferentSizes = () => {
  const sizes: Size[] = ['small', 'medium', 'large'];
  return sizes.map((size) => (
    <Avatar
      firstName="David"
      lastName="Saltares"
      avatar="https://res.cloudinary.com/teamfindr/image/upload/v1609008129/teamfindr/s65kgm1effpuothhvuir.jpg"
      size={size}
    />
  ));
};

export default config;
