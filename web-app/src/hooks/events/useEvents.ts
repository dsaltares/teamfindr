import { useQuery, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { Location, Sport } from '../../types';
import useDebounce from '../utils/useDebounce';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

const useVenues = (
  location: Location | null,
  radius: number,
  sports?: Sport[],
  date?: Date | null,
  excludeFull?: boolean
) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const debouncedRadius = useDebounce(radius, 200);
  const { isLoading, error, data } = useQuery(
    [
      'events',
      [location?.geo.coordinates, debouncedRadius, sports, date, excludeFull],
    ],
    () =>
      services.events.getEvents({
        location,
        radius: debouncedRadius,
        sports,
        date,
        excludeFull,
      }),
    {
      staleTime: STALE_TIME_MS,
      enabled: !!location,
      onSuccess: (events) => {
        events.forEach((event) => {
          queryClient.setQueryData(`events/${event.id}`, event);
        });
      },
    }
  );
  return {
    isLoading,
    error,
    events: data,
  };
};

export default useVenues;
