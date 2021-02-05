import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useServices } from '../../providers/ServicesProvider';
import useUser from '../user/useUser';

const enablePushNotifications = (): Promise<NotificationPermission> => {
  return new Promise<NotificationPermission>(function (resolve, reject) {
    if ('Notification' in window) {
      return 'denied';
    }

    const permissionResult = window.Notification.requestPermission(resolve);

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).catch(() => 'denied');
};

const shouldAskForNotificationPermission = () =>
  'Notification' in window && window.Notification.permission === 'default';

const useEnablePushSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { pushPublicKey } = useUser();
  const services = useServices();
  const enqueueEnablePushSnackbar = useCallback(() => {
    if (!pushPublicKey || !shouldAskForNotificationPermission()) {
      return;
    }
    enqueueSnackbar('Push notifications will help you stay up to date!', {
      variant: 'info',
      action: (key) => (
        <Button
          variant="text"
          color="inherit"
          onClick={async () => {
            closeSnackbar(key);
            const permission = await enablePushNotifications();
            if (permission === 'granted') {
              services.worker.subscribeToPush(pushPublicKey);
            }
          }}
        >
          Enable
        </Button>
      ),
    });
  }, [pushPublicKey, services, enqueueSnackbar, closeSnackbar]);

  return enqueueEnablePushSnackbar;
};

export default useEnablePushSnackbar;
