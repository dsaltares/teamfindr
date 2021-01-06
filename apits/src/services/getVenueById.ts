import formatMongoRecord from '../utils/formatMongoRecord';

const getVenueById = ({ venueCollection }) => async (id) => {
  const mongoVenue = await venueCollection.findOne({ _id: id });
  return mongoVenue ? formatMongoRecord(mongoVenue) : null;
};

export default getVenueById;
