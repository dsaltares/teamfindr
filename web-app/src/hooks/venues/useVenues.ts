import { useQuery, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { Location } from '../../types';
import useDebounce from '../utils/useDebounce';

const useVenues = (location: Location | null, radius?: number) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const debouncedRadius = useDebounce(radius, 200);
  const { isLoading, error, data } = useQuery(
    ['venues', [location?.geo.coordinates, debouncedRadius]],
    () =>
      services.venues.getVenues({
        location,
        radius: debouncedRadius ? debouncedRadius * 1000 : undefined,
      }),
    {
      enabled: !!location && !!debouncedRadius,
      onSuccess: (venues) => {
        venues.forEach((venue) => {
          queryClient.setQueryData(`venues/${venue.id}`, venue);
        });
      },
    }
  );
  return {
    isLoading,
    error,
    venues: data,
  };
};

export default useVenues;
