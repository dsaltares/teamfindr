import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Location, Venue } from '../../types';
import VenueAutocomplete from './VenueAutocomplete';
import VenueMarkers from './VenueMarkers';
import Map from '../Map';
import { useCurrentLocation, useVenues } from '../../hooks';
import Counter from '../Counter';

interface VenueWithMapFieldProps {
  value: Venue | null;
  onChange: (venue: Venue | null) => void;
  disabled?: boolean;
  name?: string;
  error?: boolean;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const VenueWithMapField: React.FC<VenueWithMapFieldProps> = ({
  value,
  onChange,
  name,
  disabled = false,
  error = false,
  helperText,
  onBlur,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const { location: current, isLoading } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      setLocation(current);
    }
  }, [current, setLocation, location]);

  const [radius, setRadius] = useState<number | undefined>(5);

  const { venues, isLoading: loadingVenues } = useVenues(location, radius);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={7}>
            <VenueAutocomplete
              value={value}
              options={venues || []}
              loading={loadingVenues}
              onChange={onChange}
              disabled={disabled}
              required
              name={name}
              error={error}
              helperText={helperText}
              onBlur={onBlur}
            />
          </Grid>
          <Grid item xs={5}>
            <Counter
              value={radius}
              onChange={setRadius}
              min={1}
              max={30}
              step={1}
              label="km"
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Map
          location={location}
          onChange={setLocation}
          circleRadius={radius ? radius * 1000 : undefined}
          markers={
            <VenueMarkers
              selected={value}
              venues={venues}
              onSelect={onChange}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(VenueWithMapField);
