import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Venue } from '../../types';
import VenueBasicInfoPanel from './VenueBasicInfoPanel';

const config = { title: 'VenueBasicInfoPanel' };

interface StoryWrapperProps {
  children: React.ReactElement;
}
const StoryWrapper: React.FC<StoryWrapperProps> = ({ children }) => (
  <HashRouter>{children}</HashRouter>
);

export const Default = () => {
  const venue: Venue = {
    id: 'fe1fa523-f672-43b4-abb9-ce996a99d569',
    name: 'Baza sportivă Gheorgheni',
    location: {
      geo: {
        type: 'Point',
        coordinates: [23.634633899400857, 46.76983185],
      },
      country: 'Romania',
      city: 'Cluj-Napoca',
      postcode: '400594',
      street: 'Alexandru Vaida Voevod',
      type: 'house',
      name: 'Baza sportivă Gheorgheni',
      description: 'Alexandru Vaida Voevod, 400594, Cluj-Napoca, Romania',
    },
  };
  return (
    <StoryWrapper>
      <VenueBasicInfoPanel venue={venue} />
    </StoryWrapper>
  );
};

export default config;
