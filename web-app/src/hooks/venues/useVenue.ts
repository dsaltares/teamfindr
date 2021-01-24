import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

const useVenue = (id: string) => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    `venues/${id}`,
    () => services.venues.getVenue(id),
    {
      staleTime: STALE_TIME_MS,
      cacheTime: STALE_TIME_MS,
      refetchOnMount: false,
    }
  );
  return {
    isLoading,
    error,
    venue: data,
  };
};

export default useVenue;
