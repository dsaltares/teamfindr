import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Coordinates } from '../../types';
import useLocationFromCoordinates from './useLocationFromCoordinates';

const useLocationFromMapClick = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const location = useLocationFromCoordinates(coordinates);

  useMapEvents({
    click: (e) => {
      setCoordinates([e.latlng.lng, e.latlng.lat]);
    },
  });

  return location;
};

export default useLocationFromMapClick;
