import { type Participant } from '@lib/types';
import formatParticipant from '../utils/formatParticipant';
import mongodb from './mongodb';

const getParticipants = async (eventId: string) => {
  const db = await mongodb;
  const mongoParticipants = await db
    .collection('Participant')
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

  return mongoParticipants.map(formatParticipant) as Participant[];
};

export default getParticipants;
