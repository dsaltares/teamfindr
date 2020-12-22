const { MongoClient } = require('mongodb');
const CreateUser = require('../services/createUser');
const GetUserByEmail = require('../services/getUserByEmail');
const GetUserById = require('../services/getUserById');

const setupServices = async ({ config, logger }) => {
  const client = new MongoClient(config.databaseURI, {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db();

  const deps = {
    logger,
    userCollection: db.collection('User'),
  };

  return {
    config,
    logger,
    createUser: CreateUser(deps),
    getUserByEmail: GetUserByEmail(deps),
    getUserById: GetUserById(deps),
  };
};

module.exports = setupServices;
