import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import VenueBasicInfoPanel from '../../components/VenueBasicInfoPanel';
import { useVenue } from '../../hooks';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const { venueId } = useParams<VenueRouteParams>();
  const { venue } = useVenue(venueId);

  if (!venue) {
    return <CircularProgress size={32} color="primary" />;
  }

  return <VenueBasicInfoPanel venue={venue} />;
};

export default React.memo(Venue);
