const GetEventsController = ({ searchEvents }) => async ({ query }) => {
  const events = await searchEvents(query);
  return {
    status: 200,
    body: { events },
  };
};

module.exports = GetEventsController;
