import {
  isToday,
  isThisYear,
  isTomorrow,
  isYesterday,
  format,
  parseISO,
} from 'date-fns';

const TimeFormat = 'HH:mm';
const DateFormat = 'MMM dd';
const YearFormat = 'yyyy';

const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(parsedDate)) {
    return `Today, ${format(parsedDate, TimeFormat)}`;
  }

  if (isYesterday(parsedDate)) {
    return `Yesterday, ${format(parsedDate, TimeFormat)}`;
  }

  if (isTomorrow(parsedDate)) {
    return `Tomorrow, ${format(parsedDate, TimeFormat)}`;
  }

  if (isThisYear(parsedDate)) {
    return format(parsedDate, `${DateFormat}, ${TimeFormat}`);
  }
  return format(parsedDate, `${DateFormat} ${YearFormat}, ${TimeFormat}`);
};

export default formatDate;
