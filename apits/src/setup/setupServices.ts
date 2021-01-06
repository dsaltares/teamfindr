import { MongoClient } from 'mongodb';
import createIndexes from './createIndexes';
import CreateUser from '../services/createUser';
import GetUserByEmail from '../services/getUserByEmail';
import GetUserById from '../services/getUserById';
import UpdateUser from '../services/updateUser';
import CreateVenue from '../services/createVenue';
import SearchVenues from '../services/searchVenues';
import GetVenueById from '../services/getVenueById';
import CreateEvent from '../services/createEvent';
import SearchEvents from '../services/searchEvents';
import GetEventById from '../services/getEventById';
import GetParticipants from '../services/getParticipants';
import GetParticipant from '../services/getParticipant';
import CreateParticipant from '../services/createParticipant';
import DeleteParticipant from '../services/deleteParticipant';
import GetEventIdsForUser from '../services/getEventIdsForUser';

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
    participantCollection: db.collection('Participant'),
  };

  await createIndexes(deps);

  const searchVenues = SearchVenues(deps);

  return {
    config,
    logger,
    createUser: CreateUser(deps),
    getUserByEmail: GetUserByEmail(deps),
    getUserById: GetUserById(deps),
    updateUser: UpdateUser(deps),
    createVenue: CreateVenue(deps),
    searchVenues,
    getVenueById: GetVenueById(deps),
    createEvent: CreateEvent(deps),
    searchEvents: SearchEvents({
      ...deps,
      searchVenues,
      getEventIdsForUser: GetEventIdsForUser(deps),
    }),
    getEventById: GetEventById(deps),
    getParticipants: GetParticipants(deps),
    getParticipant: GetParticipant(deps),
    createParticipant: CreateParticipant(deps),
    deleteParticipant: DeleteParticipant(deps),
  };
};

export default setupServices;
