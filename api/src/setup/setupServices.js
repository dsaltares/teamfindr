const { MongoClient } = require('mongodb');
const createIndexes = require('./createIndexes');
const CreateUser = require('../services/createUser');
const GetUserByEmail = require('../services/getUserByEmail');
const GetUserById = require('../services/getUserById');
const UpdateUser = require('../services/updateUser');
const CreateVenue = require('../services/createVenue');
const SearchVenues = require('../services/searchVenues');
const GetVenueById = require('../services/getVenueById');
const CreateEvent = require('../services/createEvent');

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
    eventCollection: db.collection('Event'),
  };

  await createIndexes(deps);

  return {
    config,
    logger,
    createUser: CreateUser(deps),
    getUserByEmail: GetUserByEmail(deps),
    getUserById: GetUserById(deps),
    updateUser: UpdateUser(deps),
    createVenue: CreateVenue(deps),
    searchVenues: SearchVenues(deps),
    getVenueById: GetVenueById(deps),
    createEvent: CreateEvent(deps),
  };
};

module.exports = setupServices;
