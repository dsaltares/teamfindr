import createRoute, { type Handler } from '@lib/api/createRoute';
import createParticipant from '@lib/data/createParticipant';
import deleteParticipant from '@lib/data/deleteParticipant';
import getEventById from '@lib/data/getEventById';
import getParticipant from '@lib/data/getParticipant';
import getParticipants from '@lib/data/getParticipants';
import type { User } from '@lib/types';
import selectTeam from '@lib/utils/selectTeam';

const getParticipantsHandler: Handler = async ({ query: { eventId } }) => {
  const event = await getEventById(eventId as string);
  if (!event) {
    return {
      status: 404,
      body: { message: 'Event not found' },
    };
  }

  const participants = await getParticipants(eventId as string);
  return {
    status: 200,
    body: { participants },
  };
};

const postParticipantHandler: Handler = async ({
  query: { eventId },
  body: { team },
  user,
}) => {
  const event = await getEventById(eventId as string);
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

  if (!!event.canceledAt) {
    return {
      status: 409,
      body: { message: 'Event is canceled' },
    };
  }

  const participant = await getParticipant({
    eventId: eventId as string,
    userId: user?.id as string,
  });
  if (participant) {
    return {
      status: 200,
      body: { participants: await getParticipants(eventId as string), event },
    };
  }

  const participants = await getParticipants(eventId as string);

  await createParticipant({
    eventId: eventId as string,
    user: user as User,
    team: selectTeam(team, event, participants),
  });
  const [updatedEvent, updatedParticipants] = await Promise.all([
    getEventById(eventId as string),
    getParticipants(eventId as string),
  ]);

  return {
    status: 201,
    body: { participants: updatedParticipants, event: updatedEvent },
  };
};

const deleteParticipantHandler: Handler = async ({
  query: { eventId },
  user,
}) => {
  const event = await getEventById(eventId as string);
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

  if (!!event.canceledAt) {
    return {
      status: 409,
      body: { message: 'Event is canceled' },
    };
  }

  const participant = await getParticipant({
    eventId: eventId as string,
    userId: user?.id as string,
  });
  if (!participant) {
    return {
      status: 200,
      body: { participants: await getParticipants(eventId as string), event },
    };
  }

  await deleteParticipant({
    eventId: eventId as string,
    userId: user?.id as string,
  });
  const [updatedEvent, updatedParticipants] = await Promise.all([
    getEventById(eventId as string),
    getParticipants(eventId as string),
  ]);

  return {
    status: 200,
    body: { participants: updatedParticipants, event: updatedEvent },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getParticipantsHandler,
    requiresAuth: false,
  },
  {
    method: 'post',
    handler: postParticipantHandler,
    requiresAuth: true,
  },
  {
    method: 'delete',
    handler: deleteParticipantHandler,
    requiresAuth: true,
  },
]);
