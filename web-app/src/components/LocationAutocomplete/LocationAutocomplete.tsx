import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useLocationAutocomplete } from '../../hooks';
import { Coordinates, Location, LocationType } from '../../types';

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
  const { suggestions, setSuggestions, loading } = useLocationAutocomplete({
    query: inputValue,
    around,
    restrictToType,
  });

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      getOptionLabel={(suggestion) => suggestion.name}
      filterOptions={(x) => x}
      options={suggestions}
      autoComplete
      includeInputInList
      filterSelectedOptions
      disableClearable={true}
      value={value as Location}
      loading={loading}
      noOptionsText={'No results'}
      onChange={(event, newValue) => {
        setSuggestions(newValue ? [newValue, ...suggestions] : suggestions);
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label="Enter a location"
          variant="outlined"
          fullWidth
          required={required}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
        />
      )}
      renderOption={(option) => (
        <Grid container alignItems="center">
          <Grid item>
            <LocationOnIcon />
          </Grid>
          <Grid item xs>
            <span style={{ fontWeight: 700 }}>{option.name}</span>
            <Typography variant="body2" color="textSecondary">
              {option.description || ''}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default React.memo(LocationAutocomplete);
