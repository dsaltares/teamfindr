import useShare from '../utils/useShare';
import { Event } from '../../types';

const getShareDataForEvent = (event?: Event) => {
  if (!event) {
    return;
  }
  const location = window.location;
  const url = `${location.protocol}//${location.host}/#/events/${event.id}`;
  return {
    title: 'TeamFindr',
    text: `Come play ${event.sport.toLowerCase()} at ${event.venue.name}.`,
    url,
  };
};

const useShareEvent = (event?: Event) => useShare(getShareDataForEvent(event));

export default useShareEvent;
