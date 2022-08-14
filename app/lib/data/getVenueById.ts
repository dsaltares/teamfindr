import formatVenue from '@lib/utils/formatVenue';
import mongodb from './mongodb';

const getVenueById = async (id: string) => {
  const db = await mongodb;
  const mongoVenue = await db.collection('Venue').findOne({ _id: id });
  return mongoVenue ? formatVenue(mongoVenue) : null;
};

export default getVenueById;
