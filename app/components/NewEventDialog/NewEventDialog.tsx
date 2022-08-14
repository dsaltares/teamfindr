import React from 'react';
import Dialog from '../Dialog';
import NewEventDialogContent from './NewEventDialogContent';

interface NewEventDialogProps {
  open: boolean;
  onClose: () => void;
}

const NewEventDialog: React.FC<NewEventDialogProps> = ({ open, onClose }) => (
  <Dialog id="new-event-dialog" title="New event" open={open} onClose={onClose}>
    <NewEventDialogContent onClose={onClose} />
  </Dialog>
);

export default React.memo(NewEventDialog);
