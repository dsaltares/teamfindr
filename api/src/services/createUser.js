const { v4: uuid } = require('uuid');
const formatMongoRecord = require('../utils/formatMongoRecord');

const createUser = ({ userCollection }) => async (userParams) => {
  const mongoFields = {
    _id: uuid(),
    createdAt: new Date(),
    ...userParams,
  };
  await userCollection.insertOne(mongoFields);

  return formatMongoRecord(mongoFields);
};

module.exports = createUser;
