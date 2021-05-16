import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Venue } from '../../types';
import useStyles from './VenueAutocomplete.styles';

interface VenueAutocompleteProps {
  value: Venue | null;
  onChange: (value: Venue | null) => void;
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

const VenueAutocomplete: React.FC<VenueAutocompleteProps> = ({
  value,
  onChange,
  options,
  loading,
  disabled,
  required,
  name,
  error,
  helperText,
  onBlur,
}) => {
  const classes = useStyles();

  return (
    <Autocomplete
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      disabled={disabled}
      options={optionsForValue(value, options)}
      loading={loading}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          disabled={disabled}
          required={required}
          name={name}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
          label="Venue"
          margin="dense"
        />
      )}
      renderOption={(option) => (
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
      )}
      classes={{
        paper: classes.paper,
        popupIndicator: classes.popupIndicator,
      }}
    />
  );
};

export default React.memo(VenueAutocomplete);
