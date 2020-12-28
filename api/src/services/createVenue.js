const { v4: uuid } = require('uuid');
const formatMongoRecord = require('../utils/formatMongoRecord');

const createVenue = ({ venueCollection, logger }) => async ({
  venue: { name, location },
  userId,
}) => {
  logger.info('creating venue', { name, userId });

  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    name,
    location,
  };

  await venueCollection.insertOne(mongoFields);

  return formatMongoRecord(mongoFields);
};

module.exports = createVenue;
