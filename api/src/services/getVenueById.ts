import { ServiceDependencies } from '../setup/setupServiceDependencies';
import formatVenue from '../utils/formatVenue';

const getVenueById = ({ venueCollection }: ServiceDependencies) => async (
  id: string
) => {
  const mongoVenue = await venueCollection.findOne({ _id: id });
  return mongoVenue ? formatVenue(mongoVenue) : null;
};

export default getVenueById;
