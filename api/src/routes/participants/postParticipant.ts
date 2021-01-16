import { ControllerCreator } from '../controller';

const PostParticipantController: ControllerCreator = ({
  getEventById,
  getParticipant,
  createParticipant,
  getParticipants,
  pushEvent,
}) => async ({ params: { eventId }, user }) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'Event not found' },
    };
  }

  if (event.capacity <= event.numParticipants) {
    return {
      status: 409,
      body: { message: 'Event full' },
    };
  }

  if (event.startsAt < new Date().toISOString()) {
    return {
      status: 409,
      body: { message: 'Event is in the past' },
    };
  }

  const participant = await getParticipant({ eventId, userId: user.id });
  if (participant) {
    return {
      status: 200,
      body: { participants: await getParticipants(eventId), event },
    };
  }

  await createParticipant({ eventId, user });
  const [updatedEvent, updatedParticipants] = await Promise.all([
    getEventById(eventId),
    getParticipants(eventId),
  ]);

  pushEvent({
    name: 'Participants:Joined',
    users: updatedParticipants.map((participant) => participant.user.id),
    payload: {
      event: updatedEvent,
      participants: updatedParticipants,
    },
  });

  return {
    status: 201,
    body: { participants: updatedParticipants, event: updatedEvent },
  };
};

export default PostParticipantController;
