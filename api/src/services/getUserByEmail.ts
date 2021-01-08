import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { User } from '../types';
import formatMongoRecord from '../utils/formatMongoRecord';

const getUserByEmail = ({ userCollection }: ServiceDependencies) => async (
  email: string
) => {
  const mongoUser = await userCollection.findOne({ email });
  return mongoUser ? (formatMongoRecord(mongoUser) as User) : null;
};

export default getUserByEmail;
