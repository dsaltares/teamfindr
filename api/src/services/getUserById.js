const formatMongoRecord = require('../utils/formatMongoRecord');

const getUserById = ({ userCollection }) => async (id) => {
  const mongoUser = await userCollection.findOne({ _id: id });
  return mongoUser ? formatMongoRecord(mongoUser) : null;
};

module.exports = getUserById;
