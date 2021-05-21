import formatMongoRecord from './formatMongoRecord';
import formatVenue from './formatVenue';
import { Event } from '../types';

const formatEvent = (mongoEvent: any): Event =>
  ({
    ...formatMongoRecord(mongoEvent),
    createdBy: formatMongoRecord(mongoEvent.createdBy),
    venue: formatVenue(mongoEvent.venue),
    participants: [],
    teams: mongoEvent.teams || ['Participants'],
  } as Event);

export default formatEvent;
