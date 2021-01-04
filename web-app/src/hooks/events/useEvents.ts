import { useQuery, useQueryClient } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';
import { GetEventsParams } from '../../services/events.service';
import useDebounce from '../utils/useDebounce';

const STALE_TIME_MS = 12 * 60 * 60 * 1000; // 12h

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
        radius: debouncedRadius,
        sports,
        date,
        excludeFull,
        venue,
        after,
        before,
        isParticipant,
      }),
    {
      staleTime: STALE_TIME_MS,
      enabled: !!location || !!venue || !!isParticipant,
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