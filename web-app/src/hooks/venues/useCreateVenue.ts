import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useCreateVenue = () => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.venues.createVenue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('venues');
      queryClient.setQueryData(`venues/${data.id}`, data);
    },
  });
  return mutation;
};

export default useCreateVenue;
