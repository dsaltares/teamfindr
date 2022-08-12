import { v4 as uuid } from 'uuid';
import type { ObjectId } from 'mongodb';
import type { UserParams } from '@lib/passport/types';
import type { User } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import mongodb from '@lib/data/mongodb';
import logger from '@lib/logger';

const createUser = async (userParams: UserParams) => {
  const roles: string[] = [];
  const mongoFields = {
    _id: uuid() as unknown as ObjectId,
    createdAt: new Date(),
    roles,
    ...userParams,
  };
  logger.info('creating user', { email: userParams.email });
  const db = await mongodb;
  await db.collection('User').insertOne(mongoFields);

  return formatMongoRecord(mongoFields) as User;
};

export default createUser;
