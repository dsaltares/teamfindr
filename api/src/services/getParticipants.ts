import { ServiceDependencies } from '../setup/setupServiceDependencies';
import formatParticipant from '../utils/formatParticipant';

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
