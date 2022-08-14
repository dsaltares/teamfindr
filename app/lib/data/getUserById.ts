import type { User } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import mongodb from '@lib/data/mongodb';

const getUserById = async (id: string) => {
  const db = await mongodb;
  const mongoUser = await db.collection('User').findOne({ _id: id });
  return mongoUser ? (formatMongoRecord(mongoUser) as User) : null;
};

export default getUserById;
