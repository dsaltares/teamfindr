import type { Venue } from '@lib/types';
import formatVenue from '@lib/utils/formatVenue';
import mongodb from './mongodb';

export interface SearchVenuesParams {
  lat?: number;
  lon?: number;
  radius?: number;
}

const searchVenues = async ({ lat, lon, radius }: SearchVenuesParams) => {
  const query: any = {};
  if (lat && lon && radius) {
    query['location.geo'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
        $maxDistance: radius,
        $minDistance: 0,
      },
    };
  }
  const db = await mongodb;
  const mongoVenues = await db.collection('Venue').find(query).toArray();
  return mongoVenues.map(formatVenue) as Venue[];
};

export default searchVenues;
