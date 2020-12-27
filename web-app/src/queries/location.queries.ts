import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { useServices } from '../providers/ServicesProvider';
import { Locations } from '../types';

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
    coordinates: data,
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
    coordinates: data,
  };
};

export const useCurrentLocation = () => {
  const geoLocation = useCurrentGeoLocation();
  const ipLocation = useCurrentIpLocation();

  const ipLocationFinished = !!ipLocation.coordinates || !!ipLocation.error;
  const geoError = !!geoLocation.error;
  const validIp = ipLocationFinished && !!ipLocation;

  if (geoError && validIp) {
    return ipLocation;
  }

  return geoLocation;
};

export const useLocationAutocomplete = (query: string) => {
  const services = useServices();
  const debouncedQuery = useDebounce(query, 200);
  const [suggestions, setSuggestions] = useState<Locations>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const newSuggestions = await services.location.getLocationSuggestions(
        debouncedQuery
      );
      if (newSuggestions) {
        setSuggestions(newSuggestions);
      }
      setLoading(false);
    };
    performSearch();
  }, [debouncedQuery, setSuggestions, setLoading, services]);

  return { suggestions, setSuggestions, loading };
};
