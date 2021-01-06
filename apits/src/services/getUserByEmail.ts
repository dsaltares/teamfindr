import formatMongoRecord from '../utils/formatMongoRecord';

const getUserByEmail = ({ userCollection }) => async (email) => {
  const mongoUser = await userCollection.findOne({ email });
  return mongoUser ? formatMongoRecord(mongoUser) : null;
};

export default getUserByEmail;
