export interface User {
  id: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export type AuthProvider = 'facebook' | 'google' | 'twitter';

export type Coordinates = [number, number];

export type LocationType =
  | 'house'
  | 'street'
  | 'district'
  | 'city'
  | 'county'
  | 'country';

export type Location = {
  coordinates: Coordinates;
  name: string;
  description?: string;
  country: string;
  city?: string;
  postcode?: string;
  number?: string;
  street?: string;
  type: LocationType;
};

export type Locations = Location[];
