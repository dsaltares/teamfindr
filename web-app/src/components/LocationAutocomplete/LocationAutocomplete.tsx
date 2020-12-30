import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useLocationAutocomplete } from '../../hooks';
import { Coordinates, Location, Locations, LocationType } from '../../types';

interface LocationAutocompleteProps {
  value: Location | null;
  around?: Coordinates;
  onChange: (value: Location | null) => void;
  disabled?: boolean;
  required?: boolean;
  restrictToType?: LocationType;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const byCoordinates = (a: Location) => (b: Location) => {
  const {
    geo: { coordinates: coordA },
  } = a;
  const {
    geo: { coordinates: coordB },
  } = b;
  return coordA[0] === coordB[0] && coordA[1] === coordB[1];
};

const suggestionsForValue = (
  value: Location | null,
  suggestions: Locations
): Locations => {
  if (!value) {
    return suggestions;
  }

  const suggestion = suggestions.find(byCoordinates(value));
  if (!suggestion) {
    return [value, ...suggestions];
  }

  return suggestions;
};

const getOptionLabel = (option: Location, restrictToType?: LocationType) =>
  restrictToType && restrictToType !== 'house'
    ? option[restrictToType] || (option.name as string)
    : option.name;

const geTextFieldLabel = (restrictToType?: LocationType) =>
  `Enter a ${restrictToType || 'location'}`;

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  around,
  onChange,
  disabled = false,
  required = false,
  restrictToType,
  name,
  error = false,
  helperText,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { suggestions, loading } = useLocationAutocomplete({
    query: inputValue,
    around,
    restrictToType,
  });

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      getOptionLabel={(option) => getOptionLabel(option, restrictToType)}
      options={suggestionsForValue(value, suggestions)}
      autoComplete
      includeInputInList
      filterSelectedOptions
      disableClearable={true}
      value={value as Location}
      loading={loading}
      noOptionsText={'No results'}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={geTextFieldLabel(restrictToType)}
          variant="outlined"
          fullWidth
          required={required}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
        />
      )}
      renderOption={(option) => (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography color="textSecondary">
              <LocationOnIcon />
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography color="textPrimary">{option.name}</Typography>
            <Typography color="textSecondary">
              {option.description || ''}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default React.memo(LocationAutocomplete);
