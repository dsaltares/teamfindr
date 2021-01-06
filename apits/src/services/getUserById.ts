import formatMongoRecord from '../utils/formatMongoRecord';

const getUserById = ({ userCollection }) => async (id) => {
  const mongoUser = await userCollection.findOne({ _id: id });
  return mongoUser ? formatMongoRecord(mongoUser) : null;
};

export default getUserById;
