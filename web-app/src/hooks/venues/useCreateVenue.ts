import { useMutation, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { Venue } from '../../types';

interface UseCreateVenueParams {
  onSuccess?: (data: Venue) => void;
  onError?: () => void;
}

const useCreateVenue = ({ onSuccess, onError }: UseCreateVenueParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const mutation = useMutation(services.venues.createVenue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('venues');
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
