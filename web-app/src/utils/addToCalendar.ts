import {
  google as getGoogleLink,
  outlook as getOutlookLink,
  office365 as getOffice365Link,
  yahoo as getYahooLink,
  ics as getICSLink,
} from 'calendar-link';
import { isMobile } from 'react-device-detect';
import fileDownload from 'js-file-download';
import { Event } from '../types';
import getEventUrl from './getEventUrl';

export type CalendarType = 'google' | 'outlook' | 'office365' | 'yahoo' | 'ics';

const getEndTime = (event: Event) => {
  const start = new Date(event.startsAt);
  return new Date(start.getTime() + event.duration * 60 * 1000);
};

const CalendarUrlFnMap = {
  google: getGoogleLink,
  outlook: getOutlookLink,
  office365: getOffice365Link,
  yahoo: getYahooLink,
  ics: getICSLink,
};

const getCalendarUrl = (type: CalendarType, event: Event) => {
  const calendarEvent = {
    title: event.sport,
    description: event.description,
    start: new Date(event.startsAt),
    end: getEndTime(event),
    location: event.venue.name,
    url: getEventUrl(event.id),
  };

  return CalendarUrlFnMap[type](calendarEvent);
};

const addToCalendar = (type: CalendarType, event: Event) => {
  const url = getCalendarUrl(type, event);

  const shouldDownload = !isMobile && url.startsWith('data');
  if (shouldDownload) {
    const filename = 'download.ics';
    const data = decodeURIComponent(
      url.replace('data:text/calendar;charset=utf8,', '')
    );
    fileDownload(data, filename);
  } else {
    window.open(url, '_blank', 'noopener noreferrer');
  }
};

export default addToCalendar;
