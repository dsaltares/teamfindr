import { ServiceDependencies } from '../setup/setupServiceDependencies';
import getPushDevicesForUser from './getPushDevicesForUser';
import deletePushDeviceByEndpoint from './deletePushDeviceByEndpoint';
import { PushMessage } from '../utils/sendPushNotification';

type Dependencies = ServiceDependencies & {
  getPushDevicesForUser: ReturnType<typeof getPushDevicesForUser>;
  deletePushDeviceByEndpoint: ReturnType<typeof deletePushDeviceByEndpoint>;
};

interface SendPushNotificationToUserParam {
  userId: string;
  message: PushMessage;
}

const sendPushNotificationToUser = ({
  logger,
  sendPushNotification,
  getPushDevicesForUser,
  deletePushDeviceByEndpoint,
}: Dependencies) => async ({
  userId,
  message,
}: SendPushNotificationToUserParam) => {
  logger.info('sending push notification', { userId, message: message.title });
  const pushDevices = await getPushDevicesForUser(userId);
  await Promise.all(
    pushDevices.map(async (pushDevice) => {
      try {
        await sendPushNotification(pushDevice.subscription, message);
      } catch (error) {
        logger.error('Failed to send push notification', {
          userId,
          endpoint: pushDevice.subscription.endpoint,
        });
        await deletePushDeviceByEndpoint(pushDevice.subscription.endpoint);
      }
    })
  );
};

export default sendPushNotificationToUser;
