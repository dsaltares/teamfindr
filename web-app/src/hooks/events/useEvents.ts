import { useQuery, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { GetEventsParams } from '../../services/events.service';
import useDebounce from '../utils/useDebounce';

const useEvents = ({
  location,
  radius,
  sports,
  date,
  excludeFull,
  venue,
  after,
  before,
  isParticipant,
}: GetEventsParams) => {
  const queryClient = useQueryClient();
  const services = useServices();
  const debouncedRadius = useDebounce(radius, 200);
  const { isLoading, error, data } = useQuery(
    [
      'events',
      [
        location?.geo.coordinates,
        debouncedRadius,
        sports,
        date,
        excludeFull,
        venue,
        after,
        before,
        isParticipant,
      ],
    ],
    () =>
      services.events.getEvents({
        location,
        radius: (debouncedRadius || 1) * 1000,
        sports,
        date,
        excludeFull,
        venue,
        after,
        before,
        isParticipant,
      }),
    {
      enabled: (!!location && !!radius) || !!venue || !!isParticipant,
      onSuccess: (events) => {
        events.forEach((event) => {
          queryClient.setQueryData(`events/${event.id}`, event);
        });
      },
    }
  );
  return {
    isLoading,
    error,
    events: data,
  };
};

export default useEvents;
