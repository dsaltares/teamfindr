const { v4: uuid } = require('uuid');
const formatMongoRecord = require('../utils/formatMongoRecord');

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

module.exports = createUser;
