import { ServiceDependencies } from '../setup/setupServiceDependencies';
interface DeleteParticipantParams {
  eventId: string;
  userId: string;
}

const deleteParticipant = ({
  logger,
  participantCollection,
  eventCollection,
}: ServiceDependencies) => async ({
  eventId,
  userId,
}: DeleteParticipantParams) => {
  logger.info('deleting participant', { eventId, userId });
  await participantCollection.deleteOne({
    user: userId,
    event: eventId,
  });
  await eventCollection.updateOne(
    { _id: eventId },
    { $inc: { numParticipants: -1 } }
  );
};

export default deleteParticipant;
