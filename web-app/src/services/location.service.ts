import axios from 'axios';
import { Coordinates, Locations, Location } from '../types';

const PHOTON_API = 'https://photon.komoot.io';
const GEOLOCATION_API =
  'https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3';

type DescriptionProperty =
  | 'number'
  | 'street'
  | 'postcode'
  | 'city'
  | 'country';
type DescriptionProperties = DescriptionProperty[];

const featureToLocation = (feature: any): Location => {
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
    coordinates: coordinates.reverse(),
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
        specificName = `${number ? `${number} ` : ''}${street}`;
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

const getLocationFromCoordinates = async (
  coordinates: Coordinates
): Promise<Location> => {
  const [latitude, longitude] = coordinates;
  const { data } = await axios.get(
    `${PHOTON_API}/reverse?lat=${latitude}&lon=${longitude}`
  );
  return {
    ...featureToLocation(data.features[0]),
    coordinates,
  };
};

const getCoordinatesFromGeolocation = (): Promise<Coordinates> =>
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

const getLocationFromGeolocation = async (): Promise<Location> => {
  const coordinates = await getCoordinatesFromGeolocation();
  return getLocationFromCoordinates(coordinates);
};

const getLocationFromIp = async (): Promise<Location> => {
  const {
    data: { latitude, longitude },
  } = await axios.get(GEOLOCATION_API);
  return getLocationFromCoordinates([latitude, longitude]);
};

const getLocationSuggestions = async (query: string): Promise<Locations> => {
  if (!query) {
    return [];
  }
  try {
    const {
      data: { features },
    } = await axios.get(`${PHOTON_API}/api/?q=${encodeURIComponent(query)}`);

    return features.map(featureToLocation);
  } catch (error) {
    return [];
  }
};

const locationService = {
  getLocationFromGeolocation,
  getLocationFromIp,
  getLocationSuggestions,
  getLocationFromCoordinates,
};

export default locationService;
