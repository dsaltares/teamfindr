import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

const useCurrentIpLocation = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'ipLocation',
    () => services.location.getLocationFromIp(),
    { staleTime: STALE_TIME_MS, refetchInterval: STALE_TIME_MS }
  );
  return {
    isLoading,
    error,
    location: data || null,
  };
};

const useCurrentGeoLocation = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'geoLocation',
    () => services.location.getLocationFromGeolocation(),
    { staleTime: STALE_TIME_MS, refetchInterval: STALE_TIME_MS }
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
