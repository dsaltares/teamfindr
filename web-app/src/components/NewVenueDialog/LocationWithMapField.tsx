import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Coordinates, Location } from '../../types';
import LocationAutocomplete from '../LocationAutocomplete';
import LocationPickerMap from './LocationPickerMap';
import { useCurrentLocation } from '../../hooks';

interface LocationFieldProps {
  location: Location | null;
  around?: Coordinates;
  onChange: (location: Location | null) => void;
  disabled?: boolean;
}

const LocationWithMapField: React.FC<LocationFieldProps> = ({
  location,
  around,
  onChange,
  disabled = false,
}) => {
  const { location: current } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      onChange(current);
    }
  }, [current, onChange, location]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <LocationAutocomplete
          value={location}
          onChange={onChange}
          disabled={disabled}
          required
          around={around}
        />
      </Grid>
      <Grid item>
        <LocationPickerMap location={location} onChange={onChange} />
      </Grid>
    </Grid>
  );
};

export default React.memo(LocationWithMapField);
