import { v4 as uuid } from 'uuid';
import type { ObjectId } from 'mongodb';
import type { Participant, User } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import logger from '@lib/logger';
import mongodb from './mongodb';

interface CreateParticipantParams {
  eventId: string;
  user: User;
  team: number;
}

const createParticipant = async ({
  eventId,
  user,
  team = 0,
}: CreateParticipantParams) => {
  logger.info('creating participant', { eventId, userId: user.id, team });

  const mongoFields = {
    _id: uuid() as unknown as ObjectId,
    createdAt: new Date(),
    event: eventId,
    user: user.id,
    team,
  };
  const db = await mongodb;
  await db.collection('Participant').insertOne(mongoFields);
  await db
    .collection('Event')
    .updateOne({ _id: eventId }, { $inc: { numParticipants: 1 } });

  return {
    ...formatMongoRecord(mongoFields),
    user,
  } as Participant;
};

export default createParticipant;
