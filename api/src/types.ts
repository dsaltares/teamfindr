import express from 'express';

type PassportProviderConfig = {
  clientID: string;
  clientSecret: string;
};

export type Config = {
  port: number;
  clientUrl: string;
  authentication: {
    facebook: PassportProviderConfig;
    twitter: PassportProviderConfig;
    google: PassportProviderConfig;
  };
  databaseURI: string;
  cookieKey: string;
  humioToken: string;
  push: {
    privateKey: string;
    publicKey: string;
  };
};

export interface User {
  id: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
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
  images: string[];
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

export type Event = {
  id: string;
  createdAt: string;
  startsAt: string;
  canceledAt?: string;
  venue: Venue;
  sport: Sport;
  duration: number;
  capacity: number;
  numParticipants: number;
  description: string;
  participants: User[];
  createdBy: User;
  price: Price;
  linkOnly?: boolean;
  teams: string[];
};

export type Participant = {
  id: string;
  event: string;
  user: User;
  team?: number;
};

export type Request = express.Request & {
  user: User;
  session: typeof express.request.session & {
    forceRenew: Date;
    redirect: string;
  };
};
