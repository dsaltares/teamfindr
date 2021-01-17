import sendMessageToWorker from './sendMessageToWorker';

const askPermission = () => {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
};

const subscribeToPushNotifications = async (pushPublicKey: string) => {
  try {
    await askPermission();
    sendMessageToWorker({
      type: 'SUBSCRIBE_TO_PUSH',
      payload: {
        pushPublicKey,
      },
    });
  } catch (_e) {}
};

export default subscribeToPushNotifications;
