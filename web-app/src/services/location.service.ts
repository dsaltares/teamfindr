import axios from 'axios';
import { Coordinates, Locations, Location } from '../types';

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

type DescriptionProperty =
  | 'number'
  | 'street'
  | 'postcode'
  | 'city'
  | 'country';
type DescriptionProperties = DescriptionProperty[];

const featureToSuggestion = (feature: any): Location => {
  const {
    geometry: { coordinates },
    properties: {
      name,
      country,
      city,
      postcode,
      housenumber: number,
      street,
      type,
    },
  } = feature;
  const baseProperties = {
    coordinates,
    country,
    city,
    postcode,
    number,
    street,
    type,
  };

  let specificName = '';
  let descriptionProperties: DescriptionProperties = [];

  switch (feature.properties.type) {
    case 'house':
      if (name) {
        descriptionProperties = [
          'number',
          'street',
          'postcode',
          'city',
          'country',
        ];
      } else {
        specificName = `${number} ${street}`;
        descriptionProperties = ['postcode', 'city', 'country'];
      }
      break;
    case 'street':
      descriptionProperties = ['postcode', 'city', 'country'];
      break;
    case 'district':
      descriptionProperties = ['city', 'country'];
      break;
    case 'city':
    case 'county':
      descriptionProperties = ['country'];
      break;
  }

  return {
    ...baseProperties,
    name: name || specificName,
    description: descriptionProperties
      .map(
        (propertyName: DescriptionProperty) =>
          baseProperties[propertyName] as string
      )
      .filter((value) => !!value)
      .join(', '),
  };
};

const getLocationSuggestions = async (query: string): Promise<Locations> => {
  if (!query) {
    return [];
  }
  try {
    const {
      data: { features },
    } = await axios.get(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`
    );

    return features.map(featureToSuggestion);
  } catch (error) {
    return [];
  }
};

const locationService = {
  getLocationFromGeolocation,
  getLocationFromIp,
  getLocationSuggestions,
};

export default locationService;
