import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const STALE_TIME_MS = 24 * 60 * 60 * 1000; // 24h

const useUser = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'user',
    () => services.user.verify(),
    {
      staleTime: STALE_TIME_MS,
      cacheTime: STALE_TIME_MS,
      refetchOnMount: false,
    }
  );
  return {
    isLoading,
    error,
    user: data?.user,
    pushPublicKey: data?.pushPublicKey,
  };
};

export default useUser;
