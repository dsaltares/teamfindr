import type { Event } from '@lib/types';
import formatMongoRecord from './formatMongoRecord';
import formatVenue from './formatVenue';

const formatEvent = (mongoEvent: any): Event =>
  ({
    ...formatMongoRecord(mongoEvent),
    createdBy: formatMongoRecord(mongoEvent.createdBy),
    venue: formatVenue(mongoEvent.venue),
    participants: [],
    teams: mongoEvent.teams || ['Participants'],
  } as unknown as Event);

export default formatEvent;
