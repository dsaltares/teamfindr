const formatMongoRecord = require('../utils/formatMongoRecord');

const getUserByEmail = ({ userCollection }) => async (email) => {
  const mongoUser = await userCollection.findOne({ email });
  return mongoUser ? formatMongoRecord(mongoUser) : null;
};

module.exports = getUserByEmail;
