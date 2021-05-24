import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface JoinTeamButtonProps {
  participants: number;
  capacity: number;
  loading: boolean;
  onJoin: () => void;
}

const JoinTeamButton: React.FC<JoinTeamButtonProps> = ({
  participants,
  capacity,
  loading,
  onJoin,
}) => {
  const isFull = participants >= capacity;
  const label = isFull ? 'Team full' : 'Join team';

  return (
    <Button
      onClick={onJoin}
      variant="contained"
      color="primary"
      disabled={isFull || loading}
    >
      {loading ? <CircularProgress size={24} /> : label}
    </Button>
  );
};

export default React.memo(JoinTeamButton);
