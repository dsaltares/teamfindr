import { useCallback, useEffect, useState } from 'react';
import { useServices } from '@components/providers/ServicesProvider';

const useLocationPermission = () => {
  const services = useServices();
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const [requesting, setRequesting] = useState(false);
  useEffect(() => {
    const queryPermission = async () => {
      if (requesting) {
        return;
      }

      if (!navigator.permissions) {
        return;
      }
      const status = await navigator.permissions.query({ name: 'geolocation' });
      setPermission(status);
    };
    void queryPermission();
  }, [requesting]);

  const request = useCallback(async () => {
    setRequesting(true);
    await services.location.requestGeoLocationPermission();
    setRequesting(false);
  }, [setRequesting, services]);

  return {
    permission: permission?.state,
    request,
    requesting,
  };
};

export default useLocationPermission;
