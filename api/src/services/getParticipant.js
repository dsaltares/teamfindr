const formatMongoRecord = require('../utils/formatMongoRecord');

const getParticipant = ({ participantCollection }) => async ({
  eventId,
  userId,
}) => {
  const mongoParticipant = await participantCollection.findOne({
    event: eventId,
    user: userId,
  });
  return mongoParticipant ? formatMongoRecord(mongoParticipant) : null;
};

module.exports = getParticipant;
