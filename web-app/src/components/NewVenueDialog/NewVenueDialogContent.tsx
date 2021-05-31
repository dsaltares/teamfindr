import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DialogContent, DialogForm, DialogActions } from '../Dialog';
import LocationWithMapField from './LocationWithMapField';
import { useCreateVenue } from '../../hooks';
import { Location } from '../../types';
import VenueImageField from './VenueImageField';

interface NewVenueFormValues {
  name: string;
  location: Location | null;
  image: string | null;
}
const NewVenueInitialFormValues: NewVenueFormValues = {
  name: '',
  location: null,
  image: null,
};

interface NewVenueDialogContentProps {
  onClose: () => void;
}

const NewVenueDialogContent: React.FC<NewVenueDialogContentProps> = ({
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = useCallback(() => {
    onClose();
    enqueueSnackbar('Venue created', { variant: 'success' });
  }, [onClose, enqueueSnackbar]);
  const onError = useCallback(() => {
    enqueueSnackbar('Failed to create venue', { variant: 'error' });
  }, [enqueueSnackbar]);
  const createVenue = useCreateVenue({ onSuccess, onError });

  return (
    <Formik
      initialValues={NewVenueInitialFormValues}
      onSubmit={(values) => {
        createVenue.mutate({
          name: values.name,
          location: values.location as Location,
          images: [values.image as string],
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
        if (!values.image) {
          errors.image = 'Required';
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
        <DialogForm onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  required
                  label="Name"
                  name="name"
                  value={values.name}
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
              <Grid item>
                <VenueImageField
                  name="image"
                  error={touched.image ? errors.image : undefined}
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
        </DialogForm>
      )}
    </Formik>
  );
};

export default NewVenueDialogContent;
