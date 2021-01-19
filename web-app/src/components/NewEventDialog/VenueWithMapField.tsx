import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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
  const theme = useTheme();
  const canCollapseMap = useMediaQuery(theme.breakpoints.down('sm'));
  const [mapVisible, setMapVisible] = useState(false);
  const handleToggleMap = () => setMapVisible((visible) => !visible);

  const [location, setLocation] = useState<Location | null>(null);
  const { location: current, isLoading } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      setLocation(current);
    }
  }, [current, setLocation, location]);

  const [radius, setRadius] = useState<number>(5000);
  const handleRadiusChange = (e: React.ChangeEvent<{}>, value: number) =>
    setRadius(value);

  const { venues, isLoading: loadingVenues } = useVenues(location, radius);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid
          container
          direction="row"
          alignContent="center"
          justify="space-between"
        >
          <Grid item xs={9} md={12}>
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
          {canCollapseMap && (
            <Grid item xs={2}>
              <IconButton color="primary" onClick={handleToggleMap}>
                {mapVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Collapse in={!canCollapseMap || mapVisible}>
          <Grid container direction="column" spacing={1}>
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
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default React.memo(VenueWithMapField);
