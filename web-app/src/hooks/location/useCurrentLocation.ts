import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import useLocationPermission from './useLocationPermission';

const useCurrentIpLocation = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery('ipLocation', () =>
    services.location.getLocationFromIp()
  );
  return {
    isLoading,
    error,
    location: data || null,
  };
};

const useCurrentGeoLocation = () => {
  const services = useServices();
  const { permission } = useLocationPermission();
  const { isLoading, error, data } = useQuery(
    'geoLocation',
    () => services.location.getLocationFromGeolocation(),
    {
      enabled: permission === 'granted',
    }
  );
  return {
    isLoading,
    error,
    location: data || null,
  };
};

const useCurrentLocation = () => {
  const geoLocation = useCurrentGeoLocation();
  const ipLocation = useCurrentIpLocation();

  const ipLocationFinished = !!ipLocation.location || !!ipLocation.error;
  const validIp = ipLocationFinished && !!ipLocation;
  const validGeo = !!geoLocation.location && !geoLocation.error;

  if (validGeo) {
    return geoLocation;
  }

  if (validIp) {
    return ipLocation;
  }

  return geoLocation;
};

export default useCurrentLocation;
