import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { User } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const getUserById = ({ userCollection }: ServiceDependencies) => async (
  id: string
) => {
  const mongoUser = await userCollection.findOne({ _id: id });
  return mongoUser ? (formatMongoRecord(mongoUser) as User) : null;
};

export default getUserById;
