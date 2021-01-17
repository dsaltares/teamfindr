import WebPush from 'web-push';
import { ServiceDependencies } from '../setup/setupServiceDependencies';
import { v4 as uuid } from 'uuid';
import formatMongoRecord from '../utils/formatMongoRecord';
import { PushDevice } from '../types';

interface UpsertPushDeviceParams {
  subscription: WebPush.PushSubscription;
  userId: string;
}

const upsertPushDevice = ({
  logger,
  pushDeviceCollection,
}: ServiceDependencies) => async ({
  subscription,
  userId,
}: UpsertPushDeviceParams) => {
  logger.info('registering push device for user', { subscription, userId });

  const mongoPushDevice = {
    _id: uuid(),
    createdAt: new Date(),
    user: userId,
    subscription,
  };

  await pushDeviceCollection.updateOne(
    { 'subscription.endpoint': subscription.endpoint },
    {
      $setOnInsert: mongoPushDevice,
    },
    {
      upsert: true,
    }
  );

  return formatMongoRecord(mongoPushDevice) as PushDevice;
};

export default upsertPushDevice;
