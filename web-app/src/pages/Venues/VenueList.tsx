import React from 'react';
import List from '@material-ui/core/List';
import VenueListItem from './VenueListItem';
import { Venue } from '../../types';

interface VenueListProps {
  venues: Venue[];
}

const VenueList: React.FC<VenueListProps> = ({ venues }) => {
  return (
    <List>
      {venues.map((venue) => (
        <VenueListItem key={venue.id} venue={venue} />
      ))}
    </List>
  );
};

export default React.memo(VenueList);
