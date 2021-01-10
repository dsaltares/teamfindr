import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import copyToClipboard from 'copy-to-clipboard';
import { Event } from '../../types';

const useShareEvent = (event?: Event) => {
  const { enqueueSnackbar } = useSnackbar();
  const shareEvent = useCallback(async () => {
    if (!event) {
      return;
    }

    const location = window.location;
    const url = `${location.protocol}//${location.host}/#/events/${event.id}`;
    if (navigator.share) {
      try {
        navigator.share({
          title: 'TeamFindr',
          text: `Come play ${event.sport.toLowerCase()} at ${
            event.venue.name
          }.`,
          url,
        });
      } catch (e) {}
    } else {
      copyToClipboard(url);
      enqueueSnackbar('Link copied', { variant: 'success' });
    }
  }, [event, enqueueSnackbar]);

  return shareEvent;
};

export default useShareEvent;
