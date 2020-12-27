import { useEffect, useState } from 'react';
import { Coordinates, Location } from '../../types';
import useCurrentLocation from './useCurrentLocation';
import useLocationFromCoordinates from './useLocationFromCoordinates';
import useDeferredState from '../utils/useDeferredState';

const useLocation = () => {
  const current = useCurrentLocation();
  const [location, setLocation] = useDeferredState<Location | null>(
    null,
    current.location,
    current.isLoading
  );
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const fromCoordinates = useLocationFromCoordinates(coordinates);

  useEffect(() => {
    if (fromCoordinates) {
      setLocation(fromCoordinates);
    }
  }, [setLocation, fromCoordinates]);

  return {
    isLoading: current.isLoading,
    location,
    current: current.location,
    setLocation,
    setCoordinates,
  };
};

export default useLocation;
