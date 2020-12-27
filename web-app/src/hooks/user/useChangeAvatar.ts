import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { User } from '../../types';
import useUser from './useUser';

const useChangeAvatar = () => {
  const queryClient = useQueryClient();
  const services = useServices();
  const user = useUser().user as User;
  const changeUserAvatar = async (file: File) => {
    const url = await services.images.uploadImage(file);
    return services.user.patchUser(user.id, { avatar: url });
  };
  const mutation = useMutation(changeUserAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData('user', data);
    },
  });
  return mutation;
};

export default useChangeAvatar;
