import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import useLocationAutocomplete from '../../utils/useLocationAutocomplete';
import { LocationSuggestion } from '../../utils/getLocationSuggestions';

interface LocationAutocompleteProps {
  value: LocationSuggestion | null;
  onChange: (value: LocationSuggestion | null) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { suggestions, setSuggestions, loading } = useLocationAutocomplete(
    inputValue
  );

  return (
    <Autocomplete
      fullWidth
      getOptionLabel={(suggestion) => suggestion.name}
      filterOptions={(x) => x}
      options={suggestions}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
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
