import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Coordinates, Location, LocationType } from '../../types';
import LocationAutocomplete from '../LocationAutocomplete';
import LocationPickerMap from './LocationPickerMap';
import { useCurrentLocation } from '../../hooks';

interface LocationFieldProps {
  location: Location | null;
  around?: Coordinates;
  onChange: (location: Location | null) => void;
  disabled?: boolean;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disableChangePositionViaMap?: boolean;
  restrictToType?: LocationType;
}

const LocationWithMapField: React.FC<LocationFieldProps> = ({
  location,
  onChange,
  disabled = false,
  name,
  error = false,
  helperText,
  onBlur,
  disableChangePositionViaMap,
  restrictToType,
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
          name={name}
          value={location}
          onChange={onChange}
          disabled={disabled || disableChangePositionViaMap}
          required
          around={current?.geo.coordinates}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
          restrictToType={restrictToType}
        />
      </Grid>
      <Grid item>
        <LocationPickerMap location={location} onChange={onChange} />
      </Grid>
    </Grid>
  );
};

export default React.memo(LocationWithMapField);
