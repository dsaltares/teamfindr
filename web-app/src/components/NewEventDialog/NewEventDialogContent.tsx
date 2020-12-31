import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DialogContent, DialogForm, DialogActions } from '../Dialog';
import SportsAutocomplete from '../SportsAutocomplete';
import { DateTimePicker } from '../DatePicker';
import { PlayersSlider, DurationSlider } from '../Slider';
import VenueWithMapField from './VenueWithMapField';
import { Sport, Venue } from '../../types';
import { useCreateEvent } from '../../hooks';
import CurrencySelect from '../CurrencySelect';

interface NewEventFormValues {
  venue: Venue | null;
  sport: Sport | null;
  capacity: number;
  startsAt: Date | null;
  duration: number;
  amount: number;
  currency: string | null;
  description: string;
}

const NewEventInitialFormValues: NewEventFormValues = {
  venue: null,
  sport: null,
  capacity: 2,
  startsAt: null,
  duration: 60,
  amount: 5,
  currency: 'EUR',
  description: '',
};

interface NewEventDialogContentProps {
  onClose: () => void;
}

const NewEventDialogContent: React.FC<NewEventDialogContentProps> = ({
  onClose,
}) => {
  const createEvent = useCreateEvent();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (createEvent.isSuccess) {
      onClose();
      enqueueSnackbar('Event created', { variant: 'success' });
    }
    if (createEvent.isError) {
      enqueueSnackbar('Failed to create event', { variant: 'error' });
    }
  }, [enqueueSnackbar, createEvent.isSuccess, createEvent.isError, onClose]);

  return (
    <Formik
      initialValues={NewEventInitialFormValues}
      onSubmit={(values) => {
        createEvent.mutate({
          startsAt: values.startsAt?.toISOString() as string,
          venue: values.venue?.id as string,
          sport: values.sport as Sport,
          duration: values.duration,
          capacity: values.capacity,
          description: values.description,
          price: {
            amount: values.amount as number,
            currency: values.currency as string,
          },
        });
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.venue) {
          errors.venue = 'Required';
        }
        if (!values.sport) {
          errors.sport = 'Required';
        }
        if (values.capacity < 2 || values.capacity > 30) {
          errors.capacity = 'Should be between 2 and 30';
        }
        if (values.amount < 0) {
          errors.amount = 'Should be positive or 0';
        }
        if (!values.currency) {
          errors.currency = 'Required';
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
        <DialogForm onSubmit={handleSubmit}>
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
                  <Grid item xs={12} md={6}>
                    <SportsAutocomplete
                      name="sport"
                      value={values.sport}
                      onChange={(value: any) => setFieldValue('sport', value)}
                      onBlur={handleBlur}
                      error={touched.sport && !!errors.sport}
                      helperText={touched.sport && errors.sport}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PlayersSlider
                      id="new-event-players-slider"
                      name="capacity"
                      value={values.capacity}
                      onChange={(e, value) => setFieldValue('capacity', value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <DurationSlider
                      id="new-event-duration-slider"
                      name="duration"
                      value={values.duration}
                      onChange={(e, value) => setFieldValue('duration', value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={8} md={8}>
                    <TextField
                      name="amount"
                      inputProps={{
                        style: { textAlign: 'right' },
                      }}
                      value={values.amount}
                      label="Price"
                      type="number"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <CurrencySelect
                      name="currency"
                      value={values.currency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.currency && !!errors.currency}
                      helperText={touched.currency && errors.currency}
                    />
                  </Grid>
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
          </DialogContent>
          <DialogActions
            actions={[
              {
                key: 'create',
                label: 'Create',
                loading: createEvent.isLoading,
                type: 'submit',
              },
            ]}
          />
        </DialogForm>
      )}
    </Formik>
  );
};

export default NewEventDialogContent;
