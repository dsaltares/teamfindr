const postEvent = ({
  getVenueById,
  createEvent,
  createParticipant,
  getEventById,
}) => async ({ body: { event, autoJoin }, user }) => {
  const venue = await getVenueById(event.venue);
  if (!venue) {
    return {
      status: 404,
      body: { message: 'venue not found' },
    };
  }
  const createdEvent = await createEvent({ user, event, venue });

  if (!autoJoin) {
    return {
      status: 201,
      body: { event: createdEvent },
    };
  }

  await createParticipant({ eventId: createdEvent.id, user });
  const updatedEvent = await getEventById(createdEvent.id);
  return {
    status: 201,
    body: { event: updatedEvent },
  };
};

export default postEvent;
