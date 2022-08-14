import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Currencies, { CurrencyFlags } from '@lib/utils/currencies';
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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  name,
  disabled,
  error,
  onBlur,
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" fullWidth margin="dense">
      <InputLabel>Currency</InputLabel>
      <Select
        classes={{
          icon: classes.icon,
        }}
        value={value}
        name={name}
        onChange={(e) => onChange(e, e.target.value as string)}
        label="Currency"
        disabled={disabled}
        error={error}
        onBlur={onBlur}
        margin="dense"
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          classes: {
            paper: classes.selectMenu,
          },
          elevation: 0,
        }}
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
