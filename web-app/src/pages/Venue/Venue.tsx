import React from 'react';
import { useParams } from 'react-router';
import Page from '../../components/Page';
import VenueBasicInfoPanel from '../../components/VenueBasicInfoPanel';
import { useVenue } from '../../hooks';

interface VenueRouteParams {
  venueId: string;
}

const Venue = () => {
  const { venueId } = useParams<VenueRouteParams>();
  const { venue } = useVenue(venueId);

  return (
    <Page title={venue?.name}>
      <VenueBasicInfoPanel venue={venue} />
    </Page>
  );
};

export default React.memo(Venue);
