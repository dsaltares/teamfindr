import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Marker as PinIcon } from '../../components/Map/icons';
import { Venue } from '../../types';
import { toLeaflet } from '../../utils/leaflet';

interface VenueMarkersProps {
  venues?: Venue[];
}

const VenueMarkers: React.FC<VenueMarkersProps> = ({ venues = [] }) => {
  return (
    <>
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={toLeaflet(venue.location.geo.coordinates)}
          icon={PinIcon}
        >
          <Popup>
            <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default React.memo(VenueMarkers);
