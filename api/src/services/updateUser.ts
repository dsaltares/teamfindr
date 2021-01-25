import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { User } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

interface UpdateUserParams {
  userId: string;
  user: {
    avatar?: string;
  };
}

const updateUser = ({ logger, userCollection }: ServiceDependencies) => async ({
  userId,
  user,
}: UpdateUserParams) => {
  logger.info('updating user', { userId });
  const { value: updatedUser } = await userCollection.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ...user,
        updatedAt: new Date(),
      },
    },
    { returnOriginal: false }
  );
  return formatMongoRecord(updatedUser) as User;
};

export default updateUser;
