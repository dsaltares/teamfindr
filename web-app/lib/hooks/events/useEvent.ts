import { useQuery } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';

const useEvent = (id: string) => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(`events/${id}`, () =>
    services.events.getEvent(id)
  );
  return {
    isLoading,
    error,
    event: data,
  };
};

export default useEvent;
