import React, { useCallback, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DialogContent, DialogForm, DialogActions } from '../Dialog';
import SportsAutocomplete from '../SportsAutocomplete';
import { DateTimePicker } from '../DatePicker';
import type { Sport, Venue } from '@lib/types';
import { useCreateEvent, useCurrencyFromCurrentLocation } from '@lib/hooks';
import CurrencySelect from '../CurrencySelect';
import Counter from '../Counter';
import Currencies from '@lib/utils/currencies';
import NewVenueDialog from '../NewVenueDialog';
import VenueWithMapField from './VenueWithMapField';

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
  teams: number;
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
  teams: 2,
});

interface NewEventDialogContentProps {
  onClose: () => void;
}

const NewEventDialogContent: React.FC<NewEventDialogContentProps> = ({
  onClose,
}) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(
    (data) => {
      onClose();
      history.push(`/events/${data.id}`);
      enqueueSnackbar('Event created', { variant: 'success' });
    },
    [onClose, history, enqueueSnackbar]
  );

  const onError = useCallback(() => {
    enqueueSnackbar('Failed to create event', { variant: 'error' });
  }, [enqueueSnackbar]);

  const createEvent = useCreateEvent({ onSuccess, onError });
  const currency = useCurrencyFromCurrentLocation();
  const initialValues = useMemo<NewEventFormValues>(
    () => getInitialValues(currency),
    [currency]
  );

  const [newVenueOpen, setNewVenueOpen] = useState(false);
  const handleNewVenueClose = useCallback(() => {
    setNewVenueOpen(false);
  }, [setNewVenueOpen]);
  const handleNewVenueOpen = useCallback(() => {
    setNewVenueOpen(true);
  }, [setNewVenueOpen]);

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
          teams: values.teams,
        });
      }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.venue) {
          errors.venue = 'Required';
        }
        if (!values.sport) {
          errors.sport = 'Required';
        }
        if (!values.capacity || values.capacity < 2 || values.capacity > 30) {
          errors.capacity = 'Should be between 2 and 30';
        }
        if (!values.duration || values.duration < 15 || values.duration > 180) {
          errors.duration = 'Should be between 15 and 180';
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
        <>
          <DialogForm onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <SportsAutocomplete
                    name="sport"
                    value={values.sport}
                    onChange={(value) => setFieldValue('sport', value)}
                    onBlur={handleBlur}
                    error={touched.sport && !!errors.sport}
                  />
                </Grid>
                <Grid item>
                  <VenueWithMapField
                    name="venue"
                    value={values.venue}
                    onChange={(value) => setFieldValue('venue', value)}
                    onNewVenue={handleNewVenueOpen}
                    onBlur={handleBlur}
                    error={touched.venue && !!errors.venue}
                    helperText={touched.venue && errors.venue}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={7}>
                      <DateTimePicker
                        name="startsAt"
                        value={values.startsAt}
                        onChange={(startsAt) =>
                          setFieldValue('startsAt', startsAt)
                        }
                        onBlur={handleBlur}
                        disablePast
                        label="Start"
                        error={touched.startsAt && !!errors.startsAt}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Counter
                        value={values.duration}
                        onChange={(value) => setFieldValue('duration', value)}
                        min={15}
                        max={180}
                        step={15}
                        label="Minutes"
                        name="duration"
                        onBlur={handleBlur}
                        error={touched.duration && !!errors.duration}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <Counter
                        value={values.teams}
                        onChange={(value) => setFieldValue('teams', value)}
                        min={2}
                        max={4}
                        step={1}
                        name="teams"
                        label="Teams"
                        error={touched.teams && !!errors.teams}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Counter
                        value={values.capacity}
                        onChange={(value) => setFieldValue('capacity', value)}
                        min={2}
                        max={30}
                        step={1}
                        name="capacity"
                        label="Players"
                        error={touched.capacity && !!errors.capacity}
                        onBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        name="amount"
                        inputProps={{
                          style: { textAlign: 'right' },
                        }}
                        value={values.amount}
                        label="Price"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.amount && !!errors.amount}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                  <TextField
                    name="description"
                    label="Description"
                    placeholder="Add indications or rules about the event."
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="autoJoin"
                            checked={values.autoJoin}
                            onChange={handleChange}
                            color="primary"
                          />
                        }
                        label={<Typography variant="body2">Join</Typography>}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="linkOnly"
                            checked={values.linkOnly}
                            onChange={handleChange}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Private (link-only)
                          </Typography>
                        }
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
                  loading: createEvent.isLoading,
                  type: 'submit',
                },
              ]}
            />
          </DialogForm>
          <NewVenueDialog
            open={newVenueOpen}
            onClose={handleNewVenueClose}
            onCreate={(newVenue) => setFieldValue('venue', newVenue)}
          />
        </>
      )}
    </Formik>
  );
};

export default NewEventDialogContent;
