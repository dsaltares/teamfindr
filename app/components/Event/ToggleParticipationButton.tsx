import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './ToggleParticipationButton.styles';

interface ToggleParticipationButtonProps {
  onJoin: () => void;
  onLeave: () => void;
  onJoinWaitlist: () => void;
  isParticipant: boolean;
  isFull: boolean;
  loading: boolean;
  disabled: boolean;
}

const ToggleParticipationButton: React.FC<ToggleParticipationButtonProps> = ({
  onJoin,
  onLeave,
  onJoinWaitlist,
  isParticipant,
  isFull,
  loading,
  disabled,
}) => {
  const classes = useStyles();

  let action = onJoin;
  let label = 'Join';
  let className;

  if (isParticipant) {
    action = onLeave;
    label = 'Leave';
    className = classes.danger;
  } else if (!isParticipant && isFull) {
    action = onJoinWaitlist;
    label = 'Full';
  }

  return (
    <Button
      className={className}
      color={isParticipant ? 'inherit' : 'primary'}
      variant="contained"
      disabled={disabled || loading || (isFull && !isParticipant)}
      onClick={action}
    >
      {loading ? <CircularProgress size={24} /> : label}
    </Button>
  );
};

export default React.memo(ToggleParticipationButton);
