import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

interface UseRemoveParticipantParams {
  onSuccess?: () => void;
  onError?: () => void;
}

const useRemoveParticipant = ({
  onSuccess,
  onError,
}: UseRemoveParticipantParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.deleteParticipant, {
    onSuccess: (data) => {
      queryClient.setQueryData(`events/${data.event.id}`, data.event);
      queryClient.setQueryData(
        `participants/${data.event.id}`,
        data.participants
      );
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
  return mutation;
};

export default useRemoveParticipant;
