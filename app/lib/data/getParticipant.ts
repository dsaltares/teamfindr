import formatParticipant from '@lib/utils/formatParticipant';
import mongodb from './mongodb';

interface GetParticipantParams {
  eventId: string;
  userId: string;
}

const getParticipant = async ({ eventId, userId }: GetParticipantParams) => {
  const db = await mongodb;
  const mongoParticipants = await db
    .collection('Participant')
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
