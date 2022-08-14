import createRoute, { type Handler } from '@lib/api/createRoute';
import createEvent from '@lib/data/createEvent';
import createParticipant from '@lib/data/createParticipant';
import getEventById from '@lib/data/getEventById';
import getVenueById from '@lib/data/getVenueById';
import searchEvents from '@lib/data/searchEvents';
import type { User } from '@lib/types';
import { parseSearchEventsQuery } from '@lib/utils/parseQueries';

const getEvents: Handler = async ({ query, user }) => {
  const events = await searchEvents({
    query: parseSearchEventsQuery(query),
    userId: user?.id as string,
  });
  return {
    status: 200,
    body: { events },
  };
};

const postEvent: Handler = async ({
  body: { event, autoJoin },
  user: maybeUser,
}) => {
  const user = maybeUser as User;
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

  await createParticipant({ eventId: createdEvent.id, user, team: 0 });
  const updatedEvent = await getEventById(createdEvent.id);
  return {
    status: 201,
    body: { event: updatedEvent },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getEvents,
    requiresAuth: false,
  },
  {
    method: 'post',
    handler: postEvent,
    requiresAuth: true,
  },
]);
