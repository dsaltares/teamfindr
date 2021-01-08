import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { Participant } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const formatParticipant = (participant: any): Participant => ({
  ...formatMongoRecord(participant),
  user: formatMongoRecord(participant.user),
});

const getParticipants = ({
  participantCollection,
}: ServiceDependencies) => async (eventId: string) => {
  const mongoParticipants = await participantCollection
    .aggregate([
      {
        $match: {
          event: eventId,
        },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $addFields: { user: { $arrayElemAt: ['$user', 0] } } },
      {
        $sort: { createdAt: 1 },
      },
    ])
    .toArray();

  return mongoParticipants.map(formatParticipant);
};

export default getParticipants;
