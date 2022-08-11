import { useCallback } from 'react';
import type { Socket } from 'socket.io-client';
import type { QueryClient} from 'react-query';
import { useQueryClient } from 'react-query';
import type { Participant, Event } from '@lib/types';

interface ParticipantChangedEvent {
  event: Event;
  participants: Participant[];
}
const onParticipantsChanged = (queryClient: QueryClient) => ({
  event,
  participants,
}: ParticipantChangedEvent) => {
  queryClient.setQueryData(`events/${event.id}`, event);
  queryClient.setQueryData(`participants/${event.id}`, participants);
};

interface EventChangedEvent {
  event: Event;
}

const onEventUpdated = (queryClient: QueryClient) => ({
  event,
}: EventChangedEvent) => {
  queryClient.setQueryData(`events/${event.id}`, event);
};

const useSubscribeToSocketEvents = () => {
  const queryClient = useQueryClient();
  const subscribe = useCallback(
    (socket: Socket) => {
      socket.on('Participants:Left', onParticipantsChanged(queryClient));
      socket.on('Participants:Joined', onParticipantsChanged(queryClient));
      socket.on('Event:Updated', onEventUpdated(queryClient));
    },
    [queryClient]
  );

  return subscribe;
};

export default useSubscribeToSocketEvents;
