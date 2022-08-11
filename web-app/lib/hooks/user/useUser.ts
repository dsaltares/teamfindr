import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';
import { useAnalytics } from '../../../components/providers/AnalyticsProvider';

const useUser = () => {
  const services = useServices();
  const analytics = useAnalytics();
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
    const { user } = data;
    void analytics.identify(user.id, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [data, analytics]);

  return {
    isLoading,
    error,
    user: data?.user,
    pushPublicKey: data?.pushPublicKey,
  };
};

export default useUser;
