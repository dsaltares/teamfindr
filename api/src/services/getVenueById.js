const formatMongoRecord = require('../utils/formatMongoRecord');

const getVenueById = ({ venueCollection }) => async (id) => {
  const mongoVenue = await venueCollection.findOne({ _id: id });
  return mongoVenue ? formatMongoRecord(mongoVenue) : null;
};

module.exports = getVenueById;
