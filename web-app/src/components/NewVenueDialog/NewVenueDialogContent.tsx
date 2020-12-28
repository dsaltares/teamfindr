import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DialogContent, DialogActions } from '../Dialog';
import LocationWithMapField from './LocationWithMapField';
import { useCreateVenue } from '../../hooks';
import { Location } from '../../types';

interface NewVenueFormValues {
  name: string;
  location: Location | null;
}
const NewVenueInitialFormValues: NewVenueFormValues = {
  name: '',
  location: null,
};

interface NewVenueDialogContentProps {
  onClose: () => void;
}

const NewVenueDialogContent: React.FC<NewVenueDialogContentProps> = ({
  onClose,
}) => {
  const createVenue = useCreateVenue();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (createVenue.isSuccess) {
      onClose();
      enqueueSnackbar('Venue created', { variant: 'success' });
    }
    if (createVenue.isError) {
      enqueueSnackbar('Failed to create venue', { variant: 'error' });
    }
  }, [enqueueSnackbar, createVenue.isSuccess, createVenue.isError, onClose]);

  return (
    <Formik
      initialValues={NewVenueInitialFormValues}
      onSubmit={(values) => {
        createVenue.mutate({
          name: values.name,
          location: values.location as Location,
        });
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.location) {
          errors.location = 'Required';
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={values.name}
                  fullWidth
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item>
                <LocationWithMapField
                  name="location"
                  location={values.location}
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  onBlur={handleBlur}
                  onChange={(newLocation) =>
                    setFieldValue('location', newLocation)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            actions={[
              {
                key: 'create',
                label: 'Create',
                loading: createVenue.isLoading,
                type: 'submit',
              },
            ]}
          />
        </form>
      )}
    </Formik>
  );
};

export default NewVenueDialogContent;
