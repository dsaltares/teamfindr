import axios from 'axios';
import type {
  Coordinates,
  Locations,
  Location,
  LocationType,
  GeoType,
} from '../types';
import withTimeout from '../utils/withTimeout';
import { API_URL } from '../endpoints';

const PHOTON_API = 'https://photon.komoot.io';

type DescriptionProperty =
  | 'number'
  | 'street'
  | 'postcode'
  | 'city'
  | 'country';
type DescriptionProperties = DescriptionProperty[];

type Feature = {
  geometry: { coordinates: [number, number] };
  properties: {
    name: string;
    country: string;
    city: string;
    postcode: string;
    housenumber: string;
    street: string;
    type: string;
  };
};

const featureToLocation = (feature: Feature): Location => {
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
    geo: {
      type: 'Point' as GeoType,
      coordinates: coordinates,
    },
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
    type: baseProperties.type as LocationType,
  };
};

const getLocationFromCoordinates = async (
  coordinates: Coordinates
): Promise<Location> => {
  const [longitude, latitude] = coordinates;
  const { data } = await axios.get(
    `${PHOTON_API}/reverse?lat=${latitude}&lon=${longitude}`
  );
  return {
    ...featureToLocation(data.features[0]),
    geo: {
      type: 'Point',
      coordinates,
    },
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
      resolve([newPosition.coords.longitude, newPosition.coords.latitude]);

    geo.getCurrentPosition(handleSuccess, reject);
  });

const getLocationFromGeolocation = async (): Promise<Location> => {
  const coordinates = await withTimeout(getCoordinatesFromGeolocation(), 2000);
  return getLocationFromCoordinates(coordinates);
};

const getLocationFromIp = async (): Promise<Location> => {
  const {
    data: { coordinates },
  } = await axios.get(`${API_URL}/location`);
  return getLocationFromCoordinates(coordinates);
};

const filterByType =
  (restrictToType?: LocationType) => (location: Location) => {
    if (!restrictToType) {
      return true;
    }

    return location.type === restrictToType;
  };

const getLocationSuggestions = async (
  query: string,
  around?: Coordinates,
  restrictToType?: LocationType
): Promise<Locations> => {
  if (!query) {
    return [];
  }

  const aroundQuery = around ? `&lon=${around[0]}&lat=${around[1]}` : '';
  const url = `${PHOTON_API}/api/?q=${encodeURIComponent(query)}${aroundQuery}`;

  try {
    const {
      data: { features },
    } = await axios.get(url);

    return features.map(featureToLocation).filter(filterByType(restrictToType));
  } catch (error) {
    return [];
  }
};

const requestGeoLocationPermission = async () => {
  try {
    await getCoordinatesFromGeolocation();
  } catch (_e) {}
};

const locationService = {
  getLocationFromGeolocation,
  getLocationFromIp,
  getLocationSuggestions,
  getLocationFromCoordinates,
  requestGeoLocationPermission,
};

export default locationService;
