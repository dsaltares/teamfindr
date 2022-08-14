import createRoute, { type Handler } from '@lib/api/createRoute';
import getEventById from '@lib/data/getEventById';
import updateEvent from '@lib/data/updateEvent';

const getEventHandler: Handler = async ({ query: { eventId } }) => {
  const event = await getEventById(eventId as string);
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

const patchEventHandler: Handler = async ({
  body: { event: updates },
  query: { eventId },
  user,
}) => {
  const userId = user?.id as string;
  const event = await getEventById(eventId as string);
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

  const updatedEvent = await updateEvent({
    eventId: eventId as string,
    updates,
    userId,
  });

  return {
    status: 200,
    body: { event: updatedEvent },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getEventHandler,
    requiresAuth: false,
  },
  {
    method: 'patch',
    handler: patchEventHandler,
    requiresAuth: true,
  },
]);
