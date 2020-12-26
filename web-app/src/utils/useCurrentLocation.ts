import { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationError {
  code: number;
  message: string;
}

const useCurrentGeoLocation = () => {
  const [position, setPosition] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError({
        code: GeolocationPositionError.POSITION_UNAVAILABLE,
        message: 'Geolocation not available',
      });
      return;
    }

    const handleSuccess: PositionCallback = (newPosition) =>
      setPosition({
        latitude: newPosition.coords.latitude,
        longitude: newPosition.coords.longitude,
      });

    const handleError: PositionErrorCallback = (error) => {
      setError(error);
    };

    geo.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return {
    position,
    error,
  };
};

const useCurrentIpLocation = () => {
  const [position, setPosition] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);

  useEffect(() => {
    const getIpLocation = async () => {
      try {
        const {
          data: { latitude, longitude },
        } = await axios.get(
          'https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3'
        );
        setPosition({
          latitude,
          longitude,
        });
      } catch (error) {
        setError({
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          message: 'Could not get location',
        });
      }
    };
    getIpLocation();
  }, []);

  return {
    position,
    error,
  };
};

const useCurrentLocation = () => {
  const geoLocation = useCurrentGeoLocation();
  const ipLocation = useCurrentIpLocation();

  const ipLocationFinished = !!ipLocation.position || !!ipLocation.error;
  const geoError = !!geoLocation.error;
  const validIp = ipLocationFinished && !!ipLocation;

  if (geoError && validIp) {
    return ipLocation;
  }

  return geoLocation;
};

export default useCurrentLocation;
