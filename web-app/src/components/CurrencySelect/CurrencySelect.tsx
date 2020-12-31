import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import useStyles from './CurrencySelect.styles';

interface CurrencySelectProps {
  value?: string | null;
  onChange: (
    event: React.ChangeEvent<{ value: unknown }>,
    value?: string | null
  ) => void;
  disabled?: boolean;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Currencies = [
  {
    value: 'EUR',
    flag: '🇪🇺',
  },
  {
    value: 'RON',
    flag: '🇷🇴',
  },
  {
    value: 'GBP',
    flag: '🇬🇧',
  },
  {
    value: 'USD',
    flag: '🇺🇸',
  },
];

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  name,
  disabled,
  error,
  helperText,
  onBlur,
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Currency</InputLabel>
      <Select
        value={value}
        name={name}
        onChange={(e) => onChange(e, e.target.value as string)}
        label="Currency"
        disabled={disabled}
        error={error}
        onBlur={onBlur}
      >
        {Currencies.map((currency) => (
          <MenuItem key={currency.value} value={currency.value}>
            <ListItemIcon className={classes.itemIcon}>
              {currency.flag}
            </ListItemIcon>
            <Typography variant="inherit"> {currency.value}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(CurrencySelect);
