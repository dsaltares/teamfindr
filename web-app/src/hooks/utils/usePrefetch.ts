import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const usePrefetch = () => {
  const services = useServices();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.fetchQuery('user', services.user.verify);
    queryClient.fetchQuery('ipLocation', services.location.getLocationFromIp);
    queryClient.fetchQuery(
      'geoLocation',
      services.location.getLocationFromGeolocation
    );
  }, [queryClient, services]);
};

export default usePrefetch;
