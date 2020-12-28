import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DialogContent, DialogActions } from '../Dialog';
import LocationWithMapField from './LocationWithMapField';
import { useCreateVenue } from '../../hooks';
import { Location } from '../../types';

interface NewVenueDialogContentProps {
  onClose: () => void;
}

const NewVenueDialogContent: React.FC<NewVenueDialogContentProps> = ({
  onClose,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [name, setName] = useState('');
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );
  const createVenue = useCreateVenue();
  const handleCreateVenue = () => {
    createVenue.mutate({ name, location: location as Location });
  };

  useEffect(() => {
    if (createVenue.isSuccess) {
      onClose();
    }
  }, [createVenue.isSuccess, onClose]);

  return (
    <>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Name"
              variant="outlined"
              value={name}
              fullWidth
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item>
            <LocationWithMapField
              location={location || null}
              onChange={setLocation}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        actions={[
          {
            key: 'create',
            label: 'Create',
            onClick: handleCreateVenue,
            loading: createVenue.isLoading,
          },
        ]}
      />
    </>
  );
};

export default NewVenueDialogContent;
