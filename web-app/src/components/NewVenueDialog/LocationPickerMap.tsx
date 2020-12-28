import React, { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Location } from '../../types';
import { toLeaflet } from '../../utils/leaflet';
import { useLocationFromMapClick } from '../../hooks';

interface MapControllerProps {
  onChange: (location: Location) => void;
  location: Location;
  disabled?: boolean;
}

const MapController: React.FC<MapControllerProps> = ({
  onChange,
  location,
  disabled,
}) => {
  const map = useMap();
  const locationFromClick = useLocationFromMapClick();

  const coordinates = location.geo.coordinates;
  const leafCoordinates = toLeaflet(coordinates);

  useEffect(() => {
    if (!disabled && location !== locationFromClick && locationFromClick) {
      onChange(locationFromClick);
    }
  }, [location, locationFromClick, onChange, disabled]);

  useEffect(() => {
    map.setView(toLeaflet(coordinates), map.getZoom());
  }, [map, coordinates]);

  return <Marker position={leafCoordinates} />;
};

interface LocationPickerMapProps {
  location: Location | null;
  onChange: (location: Location | null) => void;
  disabled?: boolean;
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  location,
  onChange,
  disabled,
}) => {
  if (!location) {
    return <Skeleton width="100%" height={310} variant="rect" />;
  }

  return (
    <div style={{ width: '100%' }}>
      <MapContainer zoom={13} scrollWheelZoom={false}>
        <MapController
          location={location}
          onChange={onChange}
          disabled={disabled}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default React.memo(LocationPickerMap);
