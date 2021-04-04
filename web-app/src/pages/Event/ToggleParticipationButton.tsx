import React from 'react';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
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
  let Icon = PersonAddIcon;
  let label = 'Join';
  let className = undefined;

  if (isParticipant) {
    action = onLeave;
    Icon = RemoveCircleIcon;
    label = 'Leave';
    className = classes.danger;
  } else if (!isParticipant && isFull) {
    action = onJoinWaitlist;
    Icon = HourglassEmptyIcon;
    label = 'Full';
  }

  return (
    <Button
      className={className}
      startIcon={<Icon />}
      color="primary"
      variant="outlined"
      disabled={disabled || loading}
      onClick={action}
    >
      {loading ? <CircularProgress size={24} color="primary" /> : label}
    </Button>
  );
};

export default React.memo(ToggleParticipationButton);
