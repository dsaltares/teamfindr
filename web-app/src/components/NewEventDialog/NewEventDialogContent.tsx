import React, { useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DialogContent, DialogForm, DialogActions } from '../Dialog';
import SportsAutocomplete from '../SportsAutocomplete';
import { DateTimePicker } from '../DatePicker';
import VenueWithMapField from './VenueWithMapField';
import { Sport, Venue } from '../../types';
import {
  useCreateEvent,
  useCurrencyFromCurrentLocation,
  useEnablePushSnackbar,
} from '../../hooks';
import CurrencySelect from '../CurrencySelect';
import NumberInput from '../NumberInput';
import Currencies from '../../utils/currencies';

interface NewEventFormValues {
  venue: Venue | null;
  sport: Sport | null;
  capacity: number;
  startsAt: Date | null;
  duration: number;
  amount: number;
  currency: string | null;
  description: string;
  autoJoin: boolean;
  linkOnly: boolean;
}

const getInitialValues = (currency: string): NewEventFormValues => ({
  venue: null,
  sport: null,
  capacity: 10,
  startsAt: null,
  duration: 60,
  amount: 5,
  currency: Currencies.includes(currency) ? currency : 'EUR',
  description: '',
  autoJoin: true,
  linkOnly: false,
});

interface NewEventDialogContentProps {
  onClose: () => void;
}

const NewEventDialogContent: React.FC<NewEventDialogContentProps> = ({
  onClose,
}) => {
  const history = useHistory();
  const createEvent = useCreateEvent();
  const { enqueueSnackbar } = useSnackbar();
  const enqueueEnablePushSnackbar = useEnablePushSnackbar();
  const currency = useCurrencyFromCurrentLocation();
  const initialValues = useMemo<NewEventFormValues>(
    () => getInitialValues(currency),
    [currency]
  );

  useEffect(() => {
    if (createEvent.isSuccess) {
      onClose();
      history.push(`/events/${createEvent.data?.id}`);
      enqueueSnackbar('Event created', { variant: 'success' });
      enqueueEnablePushSnackbar();
    }
    if (createEvent.isError) {
      enqueueSnackbar('Failed to create event', { variant: 'error' });
    }
  }, [
    enqueueSnackbar,
    enqueueEnablePushSnackbar,
    createEvent.isSuccess,
    createEvent.isError,
    createEvent.data,
    onClose,
    history,
  ]);

  return (
    <Formik
      initialValues={initialValues}
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
          autoJoin: values.autoJoin,
          linkOnly: values.linkOnly,
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
                <Grid container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={7}>
                    <SportsAutocomplete
                      name="sport"
                      value={values.sport}
                      onChange={(value: any) => setFieldValue('sport', value)}
                      onBlur={handleBlur}
                      error={touched.sport && !!errors.sport}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <NumberInput
                      value={values.capacity}
                      onChange={(value: any) =>
                        setFieldValue('capacity', value)
                      }
                      name="capacity"
                      min={2}
                      max={30}
                      label="Number of players"
                      unitLabel="players"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={7}>
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
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <NumberInput
                      value={values.duration}
                      onChange={(value: any) =>
                        setFieldValue('duration', value)
                      }
                      name="duration"
                      min={15}
                      max={180}
                      label="Duration"
                      unitLabel="minutes"
                      error={touched.duration && !!errors.duration}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={7} md={8}>
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
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={5} md={4}>
                    <CurrencySelect
                      name="currency"
                      value={values.currency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.currency && !!errors.currency}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={6} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="autoJoin"
                          checked={values.autoJoin}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Join"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="linkOnly"
                          checked={values.linkOnly}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Private (link-only)"
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
                  margin="dense"
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
