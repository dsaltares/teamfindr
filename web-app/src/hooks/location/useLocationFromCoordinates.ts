import { useQuery } from 'react-query';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '../../providers/ServicesProvider';
import { Coordinates } from '../../types';

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
  const services = useServices();
  const { data } = useQuery(
    ['location', debouncedCoordinates || []],
    () =>
      services.location.getLocationFromCoordinates(
        debouncedCoordinates as Coordinates
      ),
    {
      enabled: !!debouncedCoordinates,
    }
  );

  return data || null;
};

export default useLocationFromCoordinates;
