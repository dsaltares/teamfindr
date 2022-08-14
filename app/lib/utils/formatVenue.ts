import type { Venue } from '@lib/types';
import formatMongoRecord from './formatMongoRecord';

const formatVenue = (mongoVenue: any): Venue =>
  ({
    ...formatMongoRecord(mongoVenue),
    images: mongoVenue.images || [],
  } as Venue);

export default formatVenue;
