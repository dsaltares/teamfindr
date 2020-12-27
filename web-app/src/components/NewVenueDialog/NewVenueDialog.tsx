import React, { useState, useEffect, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '../Dialog';
import LocationAutocomplete from '../LocationAutocomplete';
import { useLocation } from '../../hooks';
import { Coordinates, Location } from '../../types';
import { toLeaflet } from '../../utils/leaflet';

interface MapControllerProps {
  onClick?: (coordinates: Coordinates) => void;
  center?: Coordinates;
}

const MapController: React.FC<MapControllerProps> = ({
  onClick = () => {},
  center,
}) => {
  const map = useMap();
  useMapEvents({
    click: (e) => {
      map.setView(e.latlng, map.getZoom());
      onClick([e.latlng.lng, e.latlng.lat]);
    },
  });

  useEffect(() => {
    if (center) {
      map.setView(toLeaflet(center), map.getZoom());
    }
  }, [map, center]);

  return null;
};

interface NewVenueDialogProps {
  open: boolean;
  onClose: () => void;
}

const NewVenueDialog: React.FC<NewVenueDialogProps> = ({ open, onClose }) => {
  const {
    isLoading,
    location,
    current,
    setLocation,
    setCoordinates,
  } = useLocation();
  const [name, setName] = useState('');
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );

  let map = null;
  if (!location) {
    map = <Skeleton width="100%" height={310} variant="rect" />;
  } else {
    const coordinates = location?.geo.coordinates as Coordinates;
    const leafCoordinates = toLeaflet(coordinates);
    map = (
      <div style={{ width: '100%' }}>
        <MapContainer
          center={leafCoordinates}
          zoom={13}
          scrollWheelZoom={false}
        >
          <MapController center={coordinates} onClick={setCoordinates} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={leafCoordinates}>
            {name && <Popup>{`${name}`}</Popup>}
          </Marker>
        </MapContainer>
      </div>
    );
  }

  return (
    <Dialog
      id="new-venue-dialog"
      title="New venue"
      open={open}
      onClose={onClose}
      content={
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Name"
              variant="outlined"
              value={name}
              fullWidth
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item>
            <LocationAutocomplete
              value={location as Location}
              onChange={setLocation}
              disabled={isLoading}
              required
              around={current?.geo.coordinates}
            />
          </Grid>
          <Grid item>{map}</Grid>
        </Grid>
      }
      actions={[
        {
          key: 'create',
          label: 'Create',
          onClick: () => {},
        },
      ]}
    />
  );
};

export default React.memo(NewVenueDialog);
