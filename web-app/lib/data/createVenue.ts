import { v4 as uuid } from 'uuid';
import type { ObjectId } from 'mongodb';
import type { Location, Venue } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import logger from '@lib/logger';
import mongodb from './mongodb';

interface CreateVenueParams {
  venue: {
    name: string;
    location: Location;
    images: string[];
  };
  userId: string;
}

const createVenue = async ({
  venue: { name, location, images },
  userId,
}: CreateVenueParams) => {
  logger.info('creating venue', { name, userId });

  const mongoFields = {
    _id: uuid() as unknown as ObjectId,
    createdAt: new Date(),
    name,
    location,
    images,
  };

  const db = await mongodb;
  await db.collection('Venue').insertOne(mongoFields);

  return formatMongoRecord(mongoFields) as Venue;
};

export default createVenue;
