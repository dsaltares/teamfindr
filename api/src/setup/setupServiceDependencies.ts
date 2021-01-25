import { MongoClient } from 'mongodb';
import { Logger } from 'winston';
import EventEmitter, { pushEvent, subscribe } from '../utils/eventEmitter';
import socketStore from '../eventHandlers/live/store';
import sendPushNotification from '../utils/sendPushNotification';
import { Config } from '../types';

interface SetupServiceDependenciesArgs {
  config: Config;
  logger: Logger;
}

const setupServiceDependencies = async ({
  config,
  logger,
}: SetupServiceDependenciesArgs) => {
  logger.info('setting up service dependencies');
  const client = new MongoClient(config.databaseURI, {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db();

  const emitter = new EventEmitter();

  return {
    config,
    logger,
    userCollection: db.collection('User'),
    venueCollection: db.collection('Venue'),
    eventCollection: db.collection('Event'),
    participantCollection: db.collection('Participant'),
    pushDeviceCollection: db.collection('PushDevice'),
    pushEvent: pushEvent(emitter),
    subscribe: subscribe(emitter),
    socketStore: socketStore(logger),
    sendPushNotification: sendPushNotification(config),
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type ServiceDependencies = ThenArg<
  ReturnType<typeof setupServiceDependencies>
>;

export default setupServiceDependencies;
