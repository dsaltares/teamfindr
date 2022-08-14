import { useEffect } from 'react';
import { useQuery } from 'react-query';
import GoogleAnalytics from 'react-ga';
import { useServices } from '@components/providers/ServicesProvider';

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

  useEffect(() => {
    if (!data?.user) {
      return;
    }
    const {
      user: { id, email, firstName, lastName },
    } = data;
    GoogleAnalytics.set({ userId: id, email, firstName, lastName });
  }, [data]);

  return {
    isLoading,
    error,
    user: data?.user,
    pushPublicKey: data?.pushPublicKey,
  };
};

export default useUser;
