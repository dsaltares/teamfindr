export interface User {
  id: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export type AuthProvider = 'facebook' | 'google' | 'twitter';

export type Coordinates = [number, number]; // longitude then latitude

export type LocationType = 'house' | 'street' | 'city' | 'country';

export type GeoType = 'Point';

export type Geo = {
  type: GeoType;
  coordinates: Coordinates;
};

export type Location = {
  geo: Geo;
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

export type Venue = {
  id: string;
  name: string;
  location: Location;
};

export type Sport =
  | 'Football'
  | 'Basketball'
  | 'Tennis'
  | 'Squash'
  | 'Volleyball'
  | 'Handball'
  | 'Padel'
  | 'Badminton'
  | 'Table tennis';

export type Price = {
  amount: number;
  currency: string;
};
