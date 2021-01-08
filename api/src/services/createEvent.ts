import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { v4 as uuid } from 'uuid';
import formatMongoRecord from '../utils/formatMongoRecord';
import { Price, User, Venue, Event } from '../types';

interface EventParams {
  sport: string;
  startsAt: string;
  duration: number;
  capacity: number;
  description: number;
  price: Price;
}
interface CreateEventParams {
  user: User;
  venue: Venue;
  event: EventParams;
}

const createEvent = ({
  eventCollection,
  logger,
}: ServiceDependencies) => async ({
  event,
  user,
  venue,
}: CreateEventParams) => {
  logger.info('creating event', { event, userId: user.id });

  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    ...event,
    startsAt: new Date(event.startsAt),
    createdBy: user.id,
    numParticipants: 0,
  };

  await eventCollection.insertOne(mongoFields);

  return {
    ...formatMongoRecord(mongoFields),
    createdBy: user,
    venue,
  } as Event;
};

export default createEvent;
