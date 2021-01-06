import formatMongoRecord from '../utils/formatMongoRecord';

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

export default getParticipant;
