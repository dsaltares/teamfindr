import React from 'react';
import List from '@material-ui/core/List';
import type { Venue } from '@lib/types';
import VenueListItem from './VenueListItem';

interface VenueListProps {
  venues: Venue[];
}

const VenueList: React.FC<VenueListProps> = ({ venues }) => (
    <List>
      {venues.map((venue) => (
        <VenueListItem key={venue.id} venue={venue} />
      ))}
    </List>
  );

export default React.memo(VenueList);
