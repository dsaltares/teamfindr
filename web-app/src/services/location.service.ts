import axios from 'axios';
import { Coordinates } from '../types';

const getLocationFromGeolocation = (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    const geo = navigator.geolocation;
    if (!geo) {
      reject({
        code: GeolocationPositionError.POSITION_UNAVAILABLE,
        message: 'Geolocation not available',
      });
    }

    const handleSuccess: PositionCallback = (newPosition) =>
      resolve([newPosition.coords.latitude, newPosition.coords.longitude]);

    geo.getCurrentPosition(handleSuccess, reject);
  });

const getLocationFromIp = (): Promise<Coordinates> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { latitude, longitude },
      } = await axios.get(
        'https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3'
      );
      resolve([latitude, longitude]);
    } catch (error) {
      reject({
        code: GeolocationPositionError.POSITION_UNAVAILABLE,
        message: 'Could not get location',
      });
    }
  });

const locationService = {
  getLocationFromGeolocation,
  getLocationFromIp,
};

export default locationService;
