import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.createEvent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('events');
      queryClient.setQueryData(`events/${data.id}`, data);
    },
  });
  return mutation;
};

export default useCreateEvent;
