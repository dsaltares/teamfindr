import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

interface UseAddParticipantParams {
  onSuccess?: () => void;
  onError?: () => void;
}

const useAddParticipant = ({ onSuccess, onError }: UseAddParticipantParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.addParticipant, {
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

export default useAddParticipant;
