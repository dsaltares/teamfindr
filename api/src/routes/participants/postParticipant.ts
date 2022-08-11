import { Participant, Event } from '@lib/types';
import { ControllerCreator } from '../controller';

const selectTeam = (
  team: number | undefined,
  event: Event,
  participants: Participant[]
): number => {
  if (team !== undefined) {
    return team;
  }

  const countPerTeam: any = participants.reduce(
    (acc: any, participant) => {
      const team = participant.team || 0;
      acc[team] = acc[team] + 1;
      return acc;
    },
    event.teams.map(() => 0)
  );

  const countPerTeamArray = Array.from(Array(event.teams.length)).map(
    (_, index) => countPerTeam[index]
  );
  const teamWithFewestPlayers = countPerTeamArray.indexOf(
    Math.min(...countPerTeamArray)
  );

  return teamWithFewestPlayers || 0;
};

const PostParticipantController: ControllerCreator = ({
  getEventById,
  getParticipant,
  createParticipant,
  getParticipants,
  pushEvent,
}) => async ({ params: { eventId }, body: { team }, user }) => {
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

  if (!!event.canceledAt) {
    return {
      status: 409,
      body: { message: 'Event is canceled' },
    };
  }

  const participant = await getParticipant({ eventId, userId: user.id });
  if (participant) {
    return {
      status: 200,
      body: { participants: await getParticipants(eventId), event },
    };
  }

  const participants = await getParticipants(eventId);

  const createdParticipant = await createParticipant({
    eventId,
    user,
    team: selectTeam(team, event, participants),
  });
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
      participant: createdParticipant,
    },
  });

  return {
    status: 201,
    body: { participants: updatedParticipants, event: updatedEvent },
  };
};

export default PostParticipantController;
