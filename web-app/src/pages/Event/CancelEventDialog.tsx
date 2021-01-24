import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Dialog, { DialogContent, DialogActions } from '../../components/Dialog';
import { useCancelEvent } from '../../hooks';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface CancelEventDialogProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
}

const CancelEventDialog: React.FC<CancelEventDialogProps> = ({
  eventId,
  open,
  onClose,
}) => (
  <Dialog
    id="cancel-event-dialog"
    title="Cancel event"
    open={open}
    onClose={onClose}
  >
    <CancelEventDialogContent eventId={eventId} onClose={onClose} />
  </Dialog>
);

interface CancelEventDialogContentProps {
  eventId: string;
  onClose: () => void;
}

const CancelEventDialogContent: React.FC<CancelEventDialogContentProps> = ({
  eventId,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const cancelEvent = useCancelEvent();
  const handleCancelClick = () => {
    cancelEvent.mutate(eventId);
  };

  useEffect(() => {
    if (cancelEvent.isSuccess) {
      enqueueSnackbar('Event canceled', { variant: 'success' });
      onClose();
    }
    if (cancelEvent.isError) {
      enqueueSnackbar('Failed to cancel event', { variant: 'error' });
      onClose();
    }
  }, [cancelEvent.isError, cancelEvent.isSuccess, onClose, enqueueSnackbar]);

  return (
    <>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1" color="textPrimary">
              Are you sure you want to cancel the event?
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              This action cannot be undone. All participants will be notified.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        actions={[
          {
            key: 'cancelEvent',
            label: 'Cancel event',
            onClick: handleCancelClick,
            danger: true,
            loading: cancelEvent.isLoading,
          },
          {
            key: 'close',
            label: 'Close',
            onClick: onClose,
          },
        ]}
      />
    </>
  );
};

export default React.memo(CancelEventDialog);
