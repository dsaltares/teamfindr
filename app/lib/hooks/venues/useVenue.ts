import { useQuery } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';

const useVenue = (id: string) => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(`venues/${id}`, () =>
    services.venues.getVenue(id)
  );
  return {
    isLoading,
    error,
    venue: data,
  };
};

export default useVenue;
