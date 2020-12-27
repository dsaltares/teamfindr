import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useLocationAutocomplete } from '../../hooks';
import { Location } from '../../types';

interface LocationAutocompleteProps {
  value: Location | null;
  onChange: (value: Location | null) => void;
  disabled?: boolean;
  required?: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  disabled = false,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { suggestions, setSuggestions, loading } = useLocationAutocomplete(
    inputValue
  );

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
          label="Enter a location"
          variant="outlined"
          fullWidth
          required={required}
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
