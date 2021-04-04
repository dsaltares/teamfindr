import formatMongoRecord from './formatMongoRecord';
import { Event } from '../types';

const formatEvent = (mongoEvent: any): Event =>
  ({
    ...formatMongoRecord(mongoEvent),
    createdBy: formatMongoRecord(mongoEvent.createdBy),
    venue: formatMongoRecord(mongoEvent.venue),
    participants: [],
    teams: mongoEvent.teams || ['Participants'],
  } as Event);

export default formatEvent;
