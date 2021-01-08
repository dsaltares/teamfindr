import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Venue } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

interface SearchVenuesParams {
  lat?: number;
  lon?: number;
  radius?: number;
}

const searchVenues = ({ venueCollection }: ServiceDependencies) => async ({
  lat,
  lon,
  radius,
}: SearchVenuesParams) => {
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
  const mongoVenues = await venueCollection.find(query).toArray();
  return mongoVenues.map(formatMongoRecord) as Venue[];
};

export default searchVenues;
