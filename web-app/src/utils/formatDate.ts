import isThisYear from 'date-fns/isThisYear';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_today';
import isYesterday from 'date-fns/is_today';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

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
