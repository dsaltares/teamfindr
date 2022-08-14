import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import {
  Marker as PinIcon,
  MarkerSelected as PinSelectedIcon,
} from '@components/Map/icons';
import type { Venue } from '@lib/types';
import { toLeaflet } from '@lib/utils/leaflet';

interface VenueMarkersProps {
  venues?: Venue[];
  selected?: Venue | null;
  onSelect: (venue: Venue) => void;
}

const VenueMarkers: React.FC<VenueMarkersProps> = ({
  venues = [],
  selected,
  onSelect,
}) => (
    <>
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={toLeaflet(venue.location.geo.coordinates)}
          icon={
            selected && selected.id === venue.id ? PinSelectedIcon : PinIcon
          }
        >
          <Popup>
            <Button onClick={() => onSelect(venue)}>{venue.name}</Button>
          </Popup>
        </Marker>
      ))}
    </>
  );

export default React.memo(VenueMarkers);
