import useShare from '../utils/useShare';
import { Venue } from '../../types';

const getShareDataForVenue = (venue?: Venue) => {
  if (!venue) {
    return;
  }
  const location = window.location;
  const url = `${location.protocol}//${location.host}/#/venues/${venue.id}`;
  return {
    title: 'TeamFindr',
    text: `Check out the events at ${venue.name}.`,
    url,
  };
};

const useShareVenue = (venue?: Venue) => useShare(getShareDataForVenue(venue));

export default useShareVenue;
