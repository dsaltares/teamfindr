import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SportIcons from '../../utils/sportIcons';
import { Sport } from '../../types';

const Sports: Sport[] = [
  'Football',
  'Basketball',
  'Tennis',
  'Squash',
  'Volleyball',
  'Handball',
  'Padel',
  'Badminton',
  'Table tennis',
];

interface SportsAutocompleteProps {
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

const valueHasIcon = (value: string): value is keyof typeof SportIcons =>
  value in SportIcons;

const getIcon = (value: string) => {
  if (valueHasIcon(value)) {
    const Icon = SportIcons[value];
    return <Icon />;
  }
  return undefined;
};

const SportsAutocomplete: React.FC<SportsAutocompleteProps> = ({
  value,
  multiple,
  onChange,
  disabled,
  required,
  name,
  error,
  helperText,
  onBlur,
}) => (
  <Autocomplete
    value={value}
    onChange={(event, newValue) => onChange(newValue)}
    multiple={multiple}
    filterSelectedOptions
    disabled={disabled}
    options={Sports}
    renderTags={(value, getTagProps) =>
      value.map((option, index) => (
        <Chip
          color="primary"
          variant="outlined"
          icon={getIcon(option)}
          label={option}
          {...getTagProps({ index })}
        />
      ))
    }
    renderInput={(params) => (
      <TextField
        {...params}
        disabled={disabled}
        required={required}
        name={name}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        label={multiple ? 'Select sports' : 'Select sport'}
      />
    )}
    renderOption={(option) => {
      return (
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography color="textSecondary">
              {getIcon(option) || null}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography color="textSecondary">{option}</Typography>
          </Grid>
        </Grid>
      );
    }}
  />
);

export default React.memo(SportsAutocomplete);
