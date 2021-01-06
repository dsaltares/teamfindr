import { v4 as uuid } from 'uuid';
import formatMongoRecord from '../utils/formatMongoRecord';

const createUser = ({ logger, userCollection }) => async (userParams) => {
  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    roles: [],
    ...userParams,
  };
  logger.info('creating user', { email: userParams.email });
  await userCollection.insertOne(mongoFields);

  return formatMongoRecord(mongoFields);
};

export default createUser;
