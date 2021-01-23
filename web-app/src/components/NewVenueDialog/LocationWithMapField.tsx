import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Coordinates, Location, LocationType } from '../../types';
import LocationAutocomplete from '../LocationAutocomplete';
import Map from '../Map';
import { useCurrentLocation } from '../../hooks';
import Counter from '../Counter';

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
  circleRadius?: number;
  onRadiusChange?: (value?: number) => void;
  markers?: React.ReactNode;
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
  circleRadius,
  onRadiusChange,
  markers,
}) => {
  const { location: current } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      onChange(current);
    }
  }, [current, onChange, location]);

  const showRadius = !!onRadiusChange;
  const locationXs = showRadius ? 7 : 12;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container direction="row" spacing={0}>
          <Grid item xs={locationXs}>
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
          {showRadius && (
            <Grid item xs={5}>
              <Counter
                value={circleRadius}
                onChange={onRadiusChange}
                min={1}
                max={30}
                step={1}
                label="km"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Map
          location={location}
          onChange={onChange}
          circleRadius={
            circleRadius && circleRadius > 0 ? circleRadius * 1000 : undefined
          }
          markers={markers}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(LocationWithMapField);
