import formatMongoRecord from './formatMongoRecord';
import { Venue } from '../types';

const formatVenue = (mongoVenue: any): Venue =>
  ({
    ...formatMongoRecord(mongoVenue),
    images: mongoVenue.images || [],
  } as Venue);

export default formatVenue;
