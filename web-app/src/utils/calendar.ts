import fileDownload from 'js-file-download';
import url from 'url';
import { Event } from '../types';
import getEventUrl from './getEventUrl';

export type CalendarType = 'google' | 'outlook' | 'office365' | 'yahoo' | 'ics';

const getEndTime = (event: Event) => {
  const start = new Date(event.startsAt);
  return new Date(start.getTime() + event.duration * 60 * 1000);
};

const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

export const getGoogleCalendarUrl = (event: Event) =>
  url.format({
    protocol: 'https',
    host: 'www.google.com',
    pathname: '/calendar/render',
    query: {
      action: 'TEMPLATE',
      text: event.sport,
      dates: `${formatDate(new Date(event.startsAt))}/${formatDate(
        getEndTime(event)
      )}`,
      details: `${event.description}\n${getEventUrl(event.id)}`,
      location: event.venue.name,
    },
  });

export const downloadICS = (event: Event) => {
  var data = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(new Date(event.startsAt))}`,
    `DTEND:${formatDate(getEndTime(event))}`,
    `SUMMARY:${event.sport}`,
    `DESCRIPTION:${event.description}\n${getEventUrl(event.id)}`,
    `LOCATION:${event.venue.name}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');
  fileDownload(data, 'event.ics');
};
