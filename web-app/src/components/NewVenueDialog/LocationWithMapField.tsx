import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Coordinates, Location, LocationType } from '../../types';
import LocationAutocomplete from '../LocationAutocomplete';
import Map from '../Map';
import { useCurrentLocation } from '../../hooks';
import { RadiusSlider } from '../Slider';

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
  onRadiusChange?: (e: React.ChangeEvent<{}>, value: number) => void;
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
  const theme = useTheme();
  const canCollapseMap = useMediaQuery(theme.breakpoints.down('sm'));
  const [mapVisible, setMapVisible] = useState(false);
  const handleToggleMap = () => setMapVisible((visible) => !visible);

  const { location: current } = useCurrentLocation();
  useEffect(() => {
    if (!location && current) {
      onChange(current);
    }
  }, [current, onChange, location]);

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
                onChange={onChange}
                circleRadius={circleRadius}
                markers={markers}
              />
            </Grid>
            {circleRadius && onRadiusChange && (
              <Grid item>
                <RadiusSlider
                  id="venue-field-radius"
                  value={circleRadius}
                  disabled={!location}
                  onChange={onRadiusChange}
                />
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default React.memo(LocationWithMapField);
