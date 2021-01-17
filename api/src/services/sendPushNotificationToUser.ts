import { ServiceDependencies } from '../setup/setupServiceDependencies';
import getPushDevicesForUser from './getPushDevicesForUser';
import deletePushDeviceByEndpoint from './deletePushDeviceByEndPoint';
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
  const pushDevices = await getPushDevicesForUser(userId);
  pushDevices.forEach(async (pushDevice) => {
    try {
      await sendPushNotification(pushDevice.subscription, message);
    } catch (error) {
      logger.info('Failed to send push notification', {
        userId,
        endpoint: pushDevice.subscription.endpoint,
      });
      await deletePushDeviceByEndpoint(pushDevice.subscription.endpoint);
    }
  });
};

export default sendPushNotificationToUser;
