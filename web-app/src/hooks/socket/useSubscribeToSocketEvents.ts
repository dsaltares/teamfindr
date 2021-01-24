import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { QueryClient, useQueryClient } from 'react-query';
import { Participant, Event } from '../../types';

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
