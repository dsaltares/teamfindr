import { useQuery } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';

const useParticipants = (id: string) => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(`participants/${id}`, () =>
    services.events.getParticipants(id)
  );
  return {
    isLoading,
    error,
    participants: data,
  };
};

export default useParticipants;
