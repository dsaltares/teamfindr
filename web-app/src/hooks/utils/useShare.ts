import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import copyToClipboard from 'copy-to-clipboard';

const useShare = (shareData?: ShareData) => {
  const { enqueueSnackbar } = useSnackbar();
  const shareEvent = useCallback(async () => {
    if (!shareData) {
      return;
    }
    if (navigator.share) {
      try {
        navigator.share(shareData);
      } catch (e) {}
    } else {
      copyToClipboard(shareData.url as string);
      enqueueSnackbar('Link copied', { variant: 'success' });
    }
  }, [shareData, enqueueSnackbar]);

  return shareEvent;
};

export default useShare;
