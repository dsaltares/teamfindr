const { v4: uuid } = require('uuid');
const formatMongoRecord = require('../utils/formatMongoRecord');

const createEvent = ({ eventCollection, logger }) => async ({
  event,
  user,
  venue,
}) => {
  logger.info('creating event', { event, userId: user.id });

  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    ...event,
  };

  await eventCollection.insertOne(mongoFields);

  return {
    ...formatMongoRecord(mongoFields),
    participants: [],
    createdBy: user,
    venue,
  };
};

module.exports = createEvent;
