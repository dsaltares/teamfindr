import { v4 as uuid } from 'uuid';
import { UserParams } from '../passport/types';
import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { User } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const createUser = ({ logger, userCollection }: ServiceDependencies) => async (
  userParams: UserParams
) => {
  const roles: string[] = [];
  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    roles,
    ...userParams,
  };
  logger.info('creating user', { email: userParams.email });
  await userCollection.insertOne(mongoFields);

  return formatMongoRecord(mongoFields) as User;
};

export default createUser;
