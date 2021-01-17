import { ServiceDependencies } from '../setup/setupServiceDependencies';
import formatParticipant from '../utils/formatParticipant';

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
  const mongoParticipants = await participantCollection
    .aggregate([
      {
        $match: {
          event: eventId,
          user: userId,
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

  return mongoParticipants.length > 0
    ? formatParticipant(mongoParticipants[0])
    : null;
};

export default getParticipant;
