import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Participant } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

interface GetParticipantParams {
  eventId: string;
  userId: string;
}

const getParticipant = ({
  participantCollection,
}: ServiceDependencies) => async ({
  eventId,
  userId,
}: GetParticipantParams) => {
  const mongoParticipant = await participantCollection.findOne({
    event: eventId,
    user: userId,
  });
  return mongoParticipant
    ? (formatMongoRecord(mongoParticipant) as Participant)
    : null;
};

export default getParticipant;
