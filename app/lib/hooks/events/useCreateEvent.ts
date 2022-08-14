import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';
import type { Event } from '@lib/types';

interface UseCreateEventParams {
  onSuccess?: (data: Event) => void;
  onError?: () => void;
}

const useCreateEvent = ({ onSuccess, onError }: UseCreateEventParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.events.createEvent, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('events');
      queryClient.setQueryData(`events/${data.id}`, data);
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError,
  });
  return mutation;
};

export default useCreateEvent;
