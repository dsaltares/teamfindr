import type { Participant } from '@lib/types';
import formatMongoRecord from './formatMongoRecord';

const formatParticipant = (participant: any): Participant =>
  ({
    ...formatMongoRecord(participant),
    user: formatMongoRecord(participant.user),
    team: participant.team || 0,
  } as Participant);

export default formatParticipant;
