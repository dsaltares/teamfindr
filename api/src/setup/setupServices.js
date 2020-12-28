const { MongoClient } = require('mongodb');
const CreateUser = require('../services/createUser');
const GetUserByEmail = require('../services/getUserByEmail');
const GetUserById = require('../services/getUserById');
const UpdateUser = require('../services/updateUser');
const CreateVenue = require('../services/createVenue');

const setupServices = async ({ config, logger }) => {
  const client = new MongoClient(config.databaseURI, {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db();

  const deps = {
    logger,
    userCollection: db.collection('User'),
    venueCollection: db.collection('Venue'),
  };

  return {
    config,
    logger,
    createUser: CreateUser(deps),
    getUserByEmail: GetUserByEmail(deps),
    getUserById: GetUserById(deps),
    updateUser: UpdateUser(deps),
    createVenue: CreateVenue(deps),
  };
};

module.exports = setupServices;
