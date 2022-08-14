import logger from '@lib/logger';
import type { User } from '@lib/types';
import formatMongoRecord from '@lib/utils/formatMongoRecord';
import mongodb from './mongodb';

interface UpdateUserParams {
  userId: string;
  user: {
    avatar?: string;
  };
}

const updateUser = async ({ userId, user }: UpdateUserParams) => {
  logger.info('updating user', { userId });
  const db = await mongodb;
  const { value: updatedUser } = await db.collection('User').findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ...user,
        updatedAt: new Date(),
      },
    }
  );
  return formatMongoRecord(updatedUser) as User;
};

export default updateUser;
