import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
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
  const [
    oldLocationFromClick,
    setOldLocationFromClick,
  ] = useState<Location | null>(null);

  const coordinates = location.geo.coordinates;

  useEffect(() => {
    if (
      !disabled &&
      locationFromClick &&
      locationFromClick !== oldLocationFromClick
    ) {
      onChange(locationFromClick);
      setOldLocationFromClick(locationFromClick);
    }
  }, [
    locationFromClick,
    onChange,
    disabled,
    oldLocationFromClick,
    setOldLocationFromClick,
  ]);

  useEffect(() => {
    map.setView(toLeaflet(coordinates), map.getZoom());
  }, [map, coordinates]);

  return null;
};

interface LocationPickerMapProps {
  location: Location | null;
  onChange: (location: Location | null) => void;
  disabled?: boolean;
  circleRadius?: number;
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  location,
  onChange,
  disabled,
  circleRadius,
}) => {
  if (!location) {
    return <Skeleton width="100%" height={310} variant="rect" />;
  }

  const coordinates = location.geo.coordinates;
  const leafCoordinates = toLeaflet(coordinates);

  return (
    <div style={{ width: '100%' }}>
      <MapContainer zoom={12} scrollWheelZoom={false}>
        <MapController
          location={location}
          onChange={onChange}
          disabled={disabled}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={leafCoordinates} />
        {circleRadius && (
          <Circle
            center={leafCoordinates}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={circleRadius}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default React.memo(LocationPickerMap);
