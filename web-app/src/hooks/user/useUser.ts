import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useUser = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'user',
    () => services.user.verify(),
  );
  return {
    isLoading,
    error,
    user: data?.user,
    pushPublicKey: data?.pushPublicKey,
  };
};

export default useUser;
