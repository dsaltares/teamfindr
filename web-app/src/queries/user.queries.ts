import { useQuery, useMutation } from 'react-query';
import { useServices } from '../providers/ServicesProvider';
import { User } from '../types';

const STALE_TIME_MS = 12 * 60 * 60 * 1000;

export const useUser = () => {
  const services = useServices();
  const { isLoading, error, data } = useQuery(
    'user',
    () => services.user.verify(),
    { staleTime: STALE_TIME_MS }
  );
  return {
    isLoading,
    error,
    user: data,
  };
};

export const useLogout = () => {
  const services = useServices();
  return services.user.logout;
};

export const useLoginViaSocialMedia = () => {
  const services = useServices();
  return services.user.openIdpAuthPage;
};

export const useChangeAvatar = () => {
  const services = useServices();
  const user = useUser().user as User;
  const mutation = useMutation(async (file: File) => {
    const url = await services.images.uploadImage(file);
    return services.user.patchUser(user.id, { avatar: url });
  });
  return mutation;
};
