import { ControllerCreator } from '../controller';

const PatchEventController: ControllerCreator = ({
  getEventById,
  updateEvent,
  pushEvent,
  getParticipants,
}) => async ({
  params: { eventId },
  body: { event: updates },
  user: { id: userId },
}) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'event not found' },
    };
  }

  if (event.createdBy.id !== userId) {
    return {
      status: 401,
      body: { message: 'only the host cancel an event' },
    };
  }

  if (event.canceledAt) {
    return {
      status: 200,
      body: { event },
    };
  }

  const [, participants] = await Promise.all([
    updateEvent({ eventId, updates, userId }),
    getParticipants(eventId),
  ]);

  const updatedEvent = await getEventById(eventId);

  const audience = [
    ...new Set([
      userId,
      ...participants.map((participant) => participant.user.id),
    ]),
  ];
  pushEvent({
    name: 'Event:Updated',
    users: audience,
    payload: {
      event: updatedEvent,
    },
  });

  if (updatedEvent.canceledAt) {
    pushEvent({
      name: 'Event:Canceled',
      users: audience,
      payload: {
        event: updatedEvent,
      },
    });
  }

  return {
    status: 200,
    body: { event: updatedEvent },
  };
};

export default PatchEventController;
