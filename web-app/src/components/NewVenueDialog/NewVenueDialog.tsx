import React from 'react';
import { Venue } from '../../types';
import Dialog from '../Dialog';
import NewVenueDialogContent from './NewVenueDialogContent';

interface NewVenueDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (venue: Venue) => void;
}

const NewVenueDialog: React.FC<NewVenueDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => (
  <Dialog
    id="new-venue-dialog"
    title="New venue"
    open={open}
    onClose={onClose}
    maxWidth="small"
  >
    <NewVenueDialogContent onClose={onClose} onCreate={onCreate} />
  </Dialog>
);

export default React.memo(NewVenueDialog);
