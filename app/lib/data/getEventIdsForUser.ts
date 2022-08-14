import mongodb from './mongodb';

const getEventIdsForUser = async (userId: string) => {
  const db = await mongodb;
  const mongoParticipants = await db
    .collection('Participant')
    .find({ user: userId })
    .toArray();
  return mongoParticipants.map((participant) => participant.event as string);
};

export default getEventIdsForUser;
