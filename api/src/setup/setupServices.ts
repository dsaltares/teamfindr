import { ServiceDependencies } from './setupServiceDependencies';
import CreateUser from '../services/createUser';
import GetUserByEmail from '../services/getUserByEmail';
import GetUserById from '../services/getUserById';
import UpdateUser from '../services/updateUser';
import CreateVenue from '../services/createVenue';
import SearchVenues from '../services/searchVenues';
import GetVenueById from '../services/getVenueById';
import CreateEvent from '../services/createEvent';
import UpdateEvent from '../services/updateEvent';
import SearchEvents from '../services/searchEvents';
import GetEventById from '../services/getEventById';
import GetParticipants from '../services/getParticipants';
import GetParticipant from '../services/getParticipant';
import CreateParticipant from '../services/createParticipant';
import DeleteParticipant from '../services/deleteParticipant';
import GetEventIdsForUser from '../services/getEventIdsForUser';
import UpsertPushDevice from '../services/upsertPushDevice';
import GetPushDevicesForUser from '../services/getPushDevicesForUser';
import DeletePushDeviceByEndpoint from '../services/deletePushDeviceByEndpoint';
import SendPushNotificationToUser from '../services/sendPushNotificationToUser';

const setupServices = (deps: ServiceDependencies) => {
  deps.logger.info('setting up services');

  const searchVenues = SearchVenues(deps);

  return {
    config: deps.config,
    logger: deps.logger,
    getSocketsForUserIds: deps.socketStore.getSocketsForUserIds,
    pushEvent: deps.pushEvent,
    createUser: CreateUser(deps),
    getUserByEmail: GetUserByEmail(deps),
    getUserById: GetUserById(deps),
    updateUser: UpdateUser(deps),
    createVenue: CreateVenue(deps),
    searchVenues,
    getVenueById: GetVenueById(deps),
    createEvent: CreateEvent(deps),
    updateEvent: UpdateEvent(deps),
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
    upsertPushDevice: UpsertPushDevice(deps),
    sendPushNotificationToUser: SendPushNotificationToUser({
      ...deps,
      getPushDevicesForUser: GetPushDevicesForUser(deps),
      deletePushDeviceByEndpoint: DeletePushDeviceByEndpoint(deps),
    }),
  };
};

export type Services = ReturnType<typeof setupServices>;

export default setupServices;
