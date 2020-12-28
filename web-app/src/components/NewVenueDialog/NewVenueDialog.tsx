import React from 'react';
import Dialog from '../Dialog';
import NewVenueDialogContent from './NewVenueDialogContent';

interface NewVenueDialogProps {
  open: boolean;
  onClose: () => void;
}

const NewVenueDialog: React.FC<NewVenueDialogProps> = ({ open, onClose }) => (
  <Dialog id="new-venue-dialog" title="New venue" open={open} onClose={onClose}>
    <NewVenueDialogContent onClose={onClose} />
  </Dialog>
);

export default React.memo(NewVenueDialog);
