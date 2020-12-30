import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DialogContent, DialogActions } from '../Dialog';
import SportsAutocomplete from '../SportsAutocomplete';
import { DateTimePicker } from '../DatePicker';
import { PlayersSlider, DurationSlider } from '../Slider';
import VenueWithMapField from './VenueWithMapField';
import { Price, Sport, Venue } from '../../types';

interface NewEventFormValues {
  venue: Venue | null;
  sport: Sport | null;
  numPlayers: number;
  startsAt: Date | null;
  duration: number;
  price: Price;
  description: string;
}

const NewEventInitialFormValues: NewEventFormValues = {
  venue: null,
  sport: null,
  numPlayers: 2,
  startsAt: null,
  duration: 60,
  price: {
    amount: 1,
    currency: 'EUR',
  },
  description: '',
};

interface NewEventDialogContentProps {
  onClose: () => void;
}

const NewEventDialogContent: React.FC<NewEventDialogContentProps> = ({
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (createVenue.isSuccess) {
  //     onClose();
  //     enqueueSnackbar('Venue created', { variant: 'success' });
  //   }
  //   if (createVenue.isError) {
  //     enqueueSnackbar('Failed to create venue', { variant: 'error' });
  //   }
  // }, [enqueueSnackbar, createVenue.isSuccess, createVenue.isError, onClose]);

  return (
    <Formik
      initialValues={NewEventInitialFormValues}
      onSubmit={(values) => {
        // createVenue.mutate({
        //   name: values.name,
        //   location: values.location as Location,
        // });
        console.log('VALUES:', values);
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.venue) {
          errors.venue = 'Required';
        }
        if (!values.sport) {
          errors.sport = 'Required';
        }
        if (values.numPlayers < 2 || values.numPlayers > 30) {
          errors.numPlayers = 'Should be between 2 and 30';
        }
        if (values.price.amount < 0) {
          errors.price = 'Should be positive or 0';
        }
        if (!values.description) {
          errors.description = 'Required';
        }
        if (!values.startsAt) {
          errors.startsAt = 'Required';
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
                <VenueWithMapField
                  name="venue"
                  value={values.venue}
                  onChange={(value) => setFieldValue('venue', value)}
                  onBlur={handleBlur}
                  error={touched.venue && !!errors.venue}
                  helperText={touched.venue && errors.venue}
                />
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <SportsAutocomplete
                      name="sport"
                      value={values.sport}
                      onChange={(value: any) => setFieldValue('sport', value)}
                      onBlur={handleBlur}
                      error={touched.sport && !!errors.sport}
                      helperText={touched.sport && errors.sport}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <PlayersSlider
                      id="new-event-players-slider"
                      name="numPlayers"
                      value={values.numPlayers}
                      onChange={(e, value) =>
                        setFieldValue('numPlayers', value)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <DateTimePicker
                        required
                        name="startsAt"
                        value={values.startsAt}
                        onChange={(startsAt) =>
                          setFieldValue('startsAt', startsAt)
                        }
                        onBlur={handleBlur}
                        disablePast
                        error={touched.startsAt && !!errors.startsAt}
                        helperText={touched.startsAt && errors.startsAt}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DurationSlider
                        id="new-event-duration-slider"
                        name="duration"
                        value={values.duration}
                        onChange={(e, value) =>
                          setFieldValue('duration', value)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="description"
                      label="Description"
                      placeholder="Add indications or rules about the event."
                      fullWidth
                      multiline
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            actions={[
              {
                key: 'create',
                label: 'Create',
                loading: false, //createVenue.isLoading,
                type: 'submit',
              },
            ]}
          />
        </form>
      )}
    </Formik>
  );
};

export default NewEventDialogContent;
