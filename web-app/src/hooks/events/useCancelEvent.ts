import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useCancelEvent = () => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.cancelEvent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('events');
      queryClient.setQueryData(`events/${data.id}`, data);
    },
  });
  return mutation;
};

export default useCancelEvent;
