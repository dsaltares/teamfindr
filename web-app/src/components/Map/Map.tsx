import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { Pin as PinIcon } from './icons';
import { Location } from '../../types';
import { toLeaflet } from '../../utils/leaflet';
import { useLocationFromMapClick } from '../../hooks';

interface MapControllerProps {
  onChange?: (location: Location) => void;
  location: Location;
}

const MapController: React.FC<MapControllerProps> = ({
  onChange,
  location,
}) => {
  const map = useMap();
  const locationFromClick = useLocationFromMapClick();

  useMapEvents({
    click: (e) => {
      map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
    },
  });

  const [
    oldLocationFromClick,
    setOldLocationFromClick,
  ] = useState<Location | null>(null);

  const coordinates = location.geo.coordinates;

  useEffect(() => {
    if (
      onChange &&
      locationFromClick &&
      locationFromClick !== oldLocationFromClick
    ) {
      onChange(locationFromClick);
      setOldLocationFromClick(locationFromClick);
    }
  }, [
    locationFromClick,
    onChange,
    oldLocationFromClick,
    setOldLocationFromClick,
  ]);

  useEffect(() => {
    map.setView(toLeaflet(coordinates), map.getZoom());
  }, [map, coordinates]);

  return null;
};

interface MapProps {
  location: Location | null;
  onChange?: (location: Location | null) => void;
  circleRadius?: number;
  markers?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  location,
  onChange,
  circleRadius,
  markers,
}) => {
  if (!location) {
    return <Skeleton width="100%" height={310} variant="rect" />;
  }

  const coordinates = location.geo.coordinates;
  const leafCoordinates = toLeaflet(coordinates);

  return (
    <div style={{ width: '100%' }}>
      <MapContainer zoom={12} scrollWheelZoom={true}>
        <MapController location={location} onChange={onChange} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={leafCoordinates} icon={PinIcon} />
        {circleRadius && (
          <Circle
            center={leafCoordinates}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={circleRadius}
          />
        )}
        {!!markers && markers}
      </MapContainer>
    </div>
  );
};

export default React.memo(Map);
