import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useUser = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'user',
    () => services.user.verify(),
    {
      staleTime: 12 * 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
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
