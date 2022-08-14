import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';

const sameDay = (first: Date | null, second: Date) =>
  !!first &&
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const tomorrow = () => {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d;
};

const nextMonday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (d.getDay() === 1) {
    d.setDate(d.getDate() + 7);
  } else {
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
  }
  return d;
};

interface DateShortcutsProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const DateShortcuts: React.FC<DateShortcutsProps> = ({ value, onChange }) => {
  const handleTodayClicked = useCallback(() => {
    onChange(today());
  }, [onChange]);

  const handleTomorrowClicked = useCallback(() => {
    onChange(tomorrow());
  }, [onChange]);

  const handleNextWeekClicked = useCallback(() => {
    onChange(nextMonday());
  }, [onChange]);

  const isToday = sameDay(value, today());
  const isTomorrow = sameDay(value, tomorrow());
  const isNextMonday = sameDay(value, nextMonday());

  return (
    <Grid container direction="row" justify="center" spacing={2}>
      <Grid item>
        <Chip
          label="Today"
          clickable
          onClick={handleTodayClicked}
          color={isToday ? 'primary' : 'default'}
        />
      </Grid>
      <Grid item>
        <Chip
          label="Tomorrow"
          clickable
          onClick={handleTomorrowClicked}
          color={isTomorrow ? 'primary' : 'default'}
        />
      </Grid>
      <Grid item>
        <Chip
          label="Next week"
          clickable
          onClick={handleNextWeekClicked}
          color={isNextMonday ? 'primary' : 'default'}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(DateShortcuts);
