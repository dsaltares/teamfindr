import { Participant } from '../types';
import formatMongoRecord from './formatMongoRecord';

const formatParticipant = (participant: any): Participant => ({
  ...formatMongoRecord(participant),
  user: formatMongoRecord(participant.user),
  team: participant.team || 0,
});

export default formatParticipant;
