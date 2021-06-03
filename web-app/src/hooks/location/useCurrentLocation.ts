import { useQuery } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { Location } from '../../types';
import useLocationPermission from './useLocationPermission';

const DefaultLocation: Location = {
  geo: {
    coordinates: [23.5899542, 46.769379],
    type: 'Point',
  },
  type: 'city',
  country: 'Romania',
  name: 'Cluj-Napoca',
  city: 'Cluj-Napoca',
};

const useCurrentIpLocation = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'ipLocation',
    services.location.getLocationFromIp,
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      keepPreviousData: true,
    }
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
  const enabled = permission === 'granted';
  const { isLoading, error, data } = useQuery(
    'geoLocation',
    services.location.getLocationFromGeolocation,
    {
      enabled,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      keepPreviousData: true,
    }
  );
  return {
    isLoading,
    error,
    location: data || null,
    enabled,
  };
};

const useCurrentLocation = () => {
  const geoLocation = useCurrentGeoLocation();
  const ipLocation = useCurrentIpLocation();

  const validIp = !!ipLocation.location && !ipLocation.error;
  const validGeo = !!geoLocation.location && !geoLocation.error;
  const ipError = !!ipLocation.error;
  const geoError = !!geoLocation.error;

  if (validGeo) {
    return geoLocation;
  }

  if (validIp) {
    return ipLocation;
  }

  if (ipError && geoError) {
    return {
      location: DefaultLocation,
      isLoading: false,
      error: null,
    };
  }

  return geoLocation;
};

export default useCurrentLocation;
