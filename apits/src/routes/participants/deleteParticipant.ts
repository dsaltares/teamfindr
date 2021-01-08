import { ControllerCreator } from '../controller';

const PostParticipantController: ControllerCreator = ({
  getEventById,
  getParticipant,
  deleteParticipant,
  getParticipants,
}) => async ({ params: { eventId }, user }) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'Event not found' },
    };
  }

  if (event.startsAt < new Date().toISOString()) {
    return {
      status: 409,
      body: { message: 'Event is in the past' },
    };
  }

  const participant = await getParticipant({ eventId, userId: user.id });
  if (!participant) {
    return {
      status: 200,
      body: { participants: await getParticipants(eventId), event },
    };
  }

  await deleteParticipant({ eventId, userId: user.id });
  const [updatedEvent, updatedParticipants] = await Promise.all([
    getEventById(eventId),
    getParticipants(eventId),
  ]);

  return {
    status: 200,
    body: { participants: updatedParticipants, event: updatedEvent },
  };
};

export default PostParticipantController;
