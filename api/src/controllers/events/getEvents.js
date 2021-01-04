const GetEventsController = ({ searchEvents }) => async ({ query, user }) => {
  const events = await searchEvents({ query, userId: user.id });
  return {
    status: 200,
    body: { events },
  };
};

module.exports = GetEventsController;