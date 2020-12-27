import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

const useUser = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'user',
    () => services.user.verify(),
    {
      staleTime: STALE_TIME_MS,
      cacheTime: STALE_TIME_MS,
    }
  );
  return {
    isLoading,
    error,
    user: data,
  };
};

export default useUser;
