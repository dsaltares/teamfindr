import type { Event, Participant } from '@lib/types';

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

export default selectTeam;
