import { useEffect, useState } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '../../providers/ServicesProvider';
import { Coordinates, Location } from '../../types';

const debounceTimeMs = 200;
const debounceOpts = {
  leading: true,
  trailing: true,
};

const useLocationFromCoordinates = (coordinates: Coordinates | null) => {
  const debouncedCoordinates = useDebounce(
    coordinates,
    debounceTimeMs,
    debounceOpts
  );
  const [location, setLocation] = useState<Location | null>(null);
  const services = useServices();

  useEffect(() => {
    const lookupCoordinates = async () => {
      if (!debouncedCoordinates) {
        return;
      }
      try {
        const newLocation = await services.location.getLocationFromCoordinates(
          debouncedCoordinates
        );
        setLocation(newLocation);
      } catch (e) {}
    };
    lookupCoordinates();
  }, [debouncedCoordinates, services, setLocation]);

  return location;
};

export default useLocationFromCoordinates;
