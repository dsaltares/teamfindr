import logger from '@lib/logger';
import mongodb from './mongodb';

interface DeleteParticipantParams {
  eventId: string;
  userId: string;
}

const deleteParticipant = async ({
  eventId,
  userId,
}: DeleteParticipantParams) => {
  logger.info('deleting participant', { eventId, userId });
  const db = await mongodb;
  await db.collection('Participant').deleteOne({
    user: userId,
    event: eventId,
  });
  await db
    .collection('Event')
    .updateOne({ _id: eventId }, { $inc: { numParticipants: -1 } });
};

export default deleteParticipant;
