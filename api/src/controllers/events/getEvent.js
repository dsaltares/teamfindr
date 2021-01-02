const GetEventsController = ({ getEventById }) => async ({
  params: { eventId },
}) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'event not found' },
    };
  }
  return {
    status: 200,
    body: { event },
  };
};

module.exports = GetEventsController;
