import React from 'react';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import { Participant } from '../../types';
import ParticipantListItem from './ParticipantListItem';

interface ParticipantListProps {
  participants?: Participant[];
  onLeave: () => void;
  leaving: boolean;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  onLeave,
  leaving,
}) => {
  return participants ? (
    <List>
      {participants.map((participant) => (
        <ParticipantListItem
          key={participant.id}
          participant={participant}
          onLeave={onLeave}
          leaving={leaving}
        />
      ))}
    </List>
  ) : (
    <Skeleton variant="rect" width="100%" height="100%" />
  );
};

export default React.memo(ParticipantList);
