import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Location, Venue } from '../../types';
import VenueAutocomplete from './VenueAutocomplete';
import VenueMarkers from './VenueMarkers';
import Map from '../Map';
import { useCurrentLocation, useVenues } from '../../hooks';
import { RadiusSlider } from '../Slider';

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
  const [radius, setRadius] = useState<number>(5000);
  const { venues, isLoading: loadingVenues } = useVenues(location, radius);
  const { location: current, isLoading } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      setLocation(current);
    }
  }, [current, setLocation, location]);

  const handleRadiusChange = (e: React.ChangeEvent<{}>, value: number) =>
    setRadius(value);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
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
      <Grid item>
        <Map
          location={location}
          onChange={setLocation}
          circleRadius={radius}
          markers={
            <VenueMarkers
              selected={value}
              venues={venues}
              onSelect={onChange}
            />
          }
        />
      </Grid>
      <Grid item>
        <RadiusSlider
          id="venue-field-radius"
          value={radius}
          disabled={isLoading}
          onChange={handleRadiusChange}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(VenueWithMapField);
