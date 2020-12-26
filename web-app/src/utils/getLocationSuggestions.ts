import axios from 'axios';

export type LocationSuggestion = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  description?: string;
  country: string;
  city?: string;
  postcode?: string;
  number?: string;
  street?: string;
  type: string;
};

export type LocationSuggestions = LocationSuggestion[];
type DescriptionProperty =
  | 'number'
  | 'street'
  | 'postcode'
  | 'city'
  | 'country';
type DescriptionProperties = DescriptionProperty[];

const featureToSuggestion = (feature: any): LocationSuggestion => {
  const {
    geometry: {
      coordinates: [latitude, longitude],
    },
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
    coordinates: { latitude, longitude },
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

const getLocationSuggestions = async (
  query: string
): Promise<LocationSuggestions> => {
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
    return [] as LocationSuggestions;
  }
};

export default getLocationSuggestions;
