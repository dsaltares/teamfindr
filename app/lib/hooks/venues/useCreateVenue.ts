import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '@components/providers/ServicesProvider';
import type { Venue } from '@lib/types';

interface UseCreateVenueParams {
  onSuccess?: (data: Venue) => void;
  onError?: () => void;
}

const useCreateVenue = ({ onSuccess, onError }: UseCreateVenueParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.venues.createVenue, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('venues');
      queryClient.setQueryData(`venues/${data.id}`, data);
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError,
  });
  return mutation;
};

export default useCreateVenue;
