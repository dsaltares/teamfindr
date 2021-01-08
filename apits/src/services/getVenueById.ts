import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Venue } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const getVenueById = ({ venueCollection }: ServiceDependencies) => async (
  id: string
) => {
  const mongoVenue = await venueCollection.findOne({ _id: id });
  return mongoVenue ? (formatMongoRecord(mongoVenue) as Venue) : null;
};

export default getVenueById;
