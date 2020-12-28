import React from 'react';
import { useParams } from 'react-router';
import { useVenue } from '../../hooks';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const { venueId } = useParams<VenueRouteParams>();
  const { isLoading, error, venue } = useVenue(venueId);

  return <div>{JSON.stringify({ isLoading, error, venue }, null, 2)}</div>;
};

export default React.memo(Venue);
