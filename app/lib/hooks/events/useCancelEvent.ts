import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';
import type { Event } from '@lib/types';

interface UseCancelEventParams {
  onSuccess?: () => void;
  onError?: () => void;
}

const useCancelEvent = ({ onSuccess, onError }: UseCancelEventParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.cancelEvent, {
    onSuccess: async (data: Event) => {
      await queryClient.invalidateQueries('events');
      queryClient.setQueryData(`events/${data.id}`, data);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
  return mutation;
};

export default useCancelEvent;
