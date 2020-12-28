import React from 'react';
import { useParams } from 'react-router';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const { venueId } = useParams<VenueRouteParams>();
  return <div>Venue {venueId}</div>;
};

export default React.memo(Venue);
