import { v4 as uuid } from 'uuid';
import type { ObjectId } from 'mongodb';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import generateTeamNames from '@lib/utils/generateTeamNames';
import type { Price, User, Venue, Event } from '../types';
import logger from '@lib/logger';
import mongodb from '@lib/data/mongodb';

interface EventParams {
  sport: string;
  startsAt: string;
  duration: number;
  capacity: number;
  description: number;
  price: Price;
  teams: number;
}
interface CreateEventParams {
  user: User;
  venue: Venue;
  event: EventParams;
}

const createEvent = async ({ event, user, venue }: CreateEventParams) => {
  logger.info('creating event', { event, userId: user.id });

  const mongoFields = {
    _id: uuid() as unknown as ObjectId,
    createdAt: new Date(),
    ...event,
    startsAt: new Date(event.startsAt),
    createdBy: user.id,
    numParticipants: 0,
    teams: generateTeamNames(event.teams),
  };

  const db = await mongodb;
  await db.collection('Event').insertOne(mongoFields);

  return {
    ...formatMongoRecord(mongoFields),
    createdBy: user,
    venue,
  } as Event;
};

export default createEvent;
