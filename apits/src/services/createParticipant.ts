import { v4 as uuid } from 'uuid';
import formatMongoRecord from '../utils/formatMongoRecord';

const createParticipant = ({
  logger,
  participantCollection,
  eventCollection,
}) => async ({ eventId, user }) => {
  logger.info('creating participant', { eventId, userId: user.id });

  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    event: eventId,
    user: user.id,
  };
  await participantCollection.insertOne(mongoFields);
  await eventCollection.updateOne(
    { _id: eventId },
    { $inc: { numParticipants: 1 } }
  );

  return {
    ...formatMongoRecord(mongoFields),
    user,
  };
};

export default createParticipant;
