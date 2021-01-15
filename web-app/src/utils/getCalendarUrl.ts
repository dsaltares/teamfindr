import {
  google as getGoogleLink,
  outlook as getOutlookLink,
  office365 as getOffice365Link,
  yahoo as getYahooLink,
  ics as getICSLink,
} from 'calendar-link';
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

export default getCalendarUrl;
