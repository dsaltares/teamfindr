const postEvent = ({ getVenueById, createEvent }) => async ({
  body: { event },
  user,
}) => {
  const venue = await getVenueById(event.venue);
  if (!venue) {
    return {
      status: 404,
      body: { message: 'venue not found' },
    };
  }
  const createdEvent = await createEvent({ user, event, venue });
  return {
    status: 201,
    body: { event: createdEvent },
  };
};

module.exports = postEvent;
