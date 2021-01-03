import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

const useParticipants = (id: string) => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    `participants/${id}`,
    () => services.events.getParticipants(id),
    {
      staleTime: STALE_TIME_MS,
    }
  );
  return {
    isLoading,
    error,
    participants: data,
  };
};

export default useParticipants;
