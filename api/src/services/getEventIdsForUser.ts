import { ServiceDependencies } from '../setup/setupServiceDependencies';

const getEventIdsForUser = ({
  participantCollection,
}: ServiceDependencies) => async (userId: string) => {
  const mongoParticipants = await participantCollection
    .find({ user: userId })
    .toArray();
  return mongoParticipants.map((participant) => participant.event as string);
};

export default getEventIdsForUser;
