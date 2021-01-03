import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useAddParticipant = () => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.addParticipant, {
    onSuccess: (data) => {
      queryClient.setQueryData(`events/${data.event.id}`, data.event);
      queryClient.setQueryData(
        `participants/${data.event.id}`,
        data.participants
      );
    },
  });
  return mutation;
};

export default useAddParticipant;
