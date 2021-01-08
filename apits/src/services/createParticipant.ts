import { v4 as uuid } from 'uuid';
import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Participant, User } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

interface CreateParticipantParams {
  eventId: string;
  user: User;
}

const createParticipant = ({
  logger,
  participantCollection,
  eventCollection,
}: ServiceDependencies) => async ({
  eventId,
  user,
}: CreateParticipantParams) => {
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
  } as Participant;
};

export default createParticipant;
