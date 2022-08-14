import React from 'react';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import type { Venue } from '@lib/types';

interface VenueAutocompleteProps {
  value: Venue | null;
  onChange: (value: Venue | null) => void;
  onNewVenue?: () => void;
  options: Venue[];
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const optionsForValue = (value: Venue | null, options: Venue[]): Venue[] => {
  if (!value) {
    return options;
  }

  const suggestion = options.find((v) => v.id === value.id);
  if (!suggestion) {
    return [value, ...options];
  }

  return options;
};

const defaultFilterOptions = createFilterOptions<Venue>();

const NewVenue: Venue = {
  id: 'new_venue',
  name: 'new_venue',
  images: [],
  location: {
    geo: { type: 'Point', coordinates: [0, 0] },
    name: '',
    country: '',
    type: 'country',
  },
};

const VenueAutocomplete: React.FC<VenueAutocompleteProps> = ({
  value,
  onChange,
  onNewVenue,
  options,
  loading,
  disabled,
  required,
  name,
  error,
  helperText,
  onBlur,
}) => (
  <Autocomplete
    value={value}
    onChange={(_event, newValue) => {
      if (newValue?.id === 'new_venue') {
        if (onNewVenue) {
          onNewVenue();
        }
      } else {
        onChange(newValue);
      }
    }}
    disabled={disabled}
    options={optionsForValue(value, options)}
    loading={loading}
    getOptionLabel={(option) => option.name}
    renderInput={(params) => (
      <TextField
        {...params}
        disabled={disabled}
        required={required}
        name={name}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        label="Venue"
      />
    )}
    renderOption={(option) => {
      if (option.id === 'new_venue') {
        return (
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography color="primary">
                    <AddCircleOutlineIcon />
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="div"
                  >
                    Add new venue
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>
        );
      }

      return (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography color="primary">
              <LocationOnIcon />
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body1" color="textPrimary">
              {option.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {option.location.description || ''}
            </Typography>
          </Grid>
        </Grid>
      );
    }}
    filterOptions={(options, state) => [
      NewVenue,
      ...defaultFilterOptions(options, state),
    ]}
  />
);

export default React.memo(VenueAutocomplete);
