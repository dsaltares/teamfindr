import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import useStyles from './CurrencySelect.styles';
import Currencies from '../../utils/currencies';

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

type CurrencyFlagDict = Record<string, string>;
const CurrencyFlags: CurrencyFlagDict = {
  EUR: '🇪🇺',
  RON: '🇷🇴',
  GBP: '🇬🇧',
  USD: '🇺🇸',
};

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
          <MenuItem key={currency} value={currency}>
            <ListItemIcon className={classes.itemIcon}>
              {CurrencyFlags[currency]}
            </ListItemIcon>
            <Typography variant="inherit"> {currency}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(CurrencySelect);
