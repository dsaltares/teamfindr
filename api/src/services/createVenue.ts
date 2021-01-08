import { v4 as uuid } from 'uuid';
import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Location, Venue } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

interface CreateVenueParams {
  venue: {
    name: string;
    location: Location;
  };
  userId: string;
}

const createVenue = ({
  venueCollection,
  logger,
}: ServiceDependencies) => async ({
  venue: { name, location },
  userId,
}: CreateVenueParams) => {
  logger.info('creating venue', { name, userId });

  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    name,
    location,
  };

  await venueCollection.insertOne(mongoFields);

  return formatMongoRecord(mongoFields) as Venue;
};

export default createVenue;
