import { useEffect } from 'react';
import { useServices } from '../../providers/ServicesProvider';
import useUser from '../user/useUser';

const useSubscribePush = () => {
  const { pushPublicKey } = useUser();
  const services = useServices();

  useEffect(() => {
    const shouldSubscribe =
      pushPublicKey && Notification.permission === 'granted';
    if (shouldSubscribe) {
      services.worker.subscribeToPush(pushPublicKey as string);
    }
  }, [pushPublicKey, services]);
};

export default useSubscribePush;
