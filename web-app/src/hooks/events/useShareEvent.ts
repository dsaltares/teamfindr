import useShare from '../utils/useShare';
import { Event } from '../../types';
import getEventUrl from '../../utils/getEventUrl';

const getShareDataForEvent = (event?: Event) => {
  if (!event) {
    return;
  }

  return {
    title: 'TeamFindr',
    text: `Come play ${event.sport.toLowerCase()} at ${event.venue.name}.`,
    url: getEventUrl(event.id),
  };
};

const useShareEvent = (event?: Event) => useShare(getShareDataForEvent(event));

export default useShareEvent;
