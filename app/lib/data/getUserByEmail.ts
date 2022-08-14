import type { User } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import mongodb from '@lib/data/mongodb';

const getUserByEmail = async (email: string) => {
  const db = await mongodb;
  const mongoUser = await db.collection('User').findOne({ email });
  return mongoUser ? (formatMongoRecord(mongoUser) as User) : null;
};

export default getUserByEmail;
