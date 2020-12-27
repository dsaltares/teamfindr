import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import Skeleton from '@material-ui/lab/Skeleton';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import './Events.css';
import useStyles, { AccordionSummary } from './Events.styles';
import { useCurrentLocation } from '../../hooks';
import { Coordinates, Location } from '../../types';
import { toLeaflet } from '../../utils/leaflet';

const Events = () => {
  const currentLocation = useCurrentLocation();
  const classes = useStyles();

  let map = null;
  if (currentLocation.isLoading) {
    map = <Skeleton width="100%" height={310} variant="rect" />;
  } else if (currentLocation.error instanceof Error) {
    map = <div>{currentLocation.error.message}</div>;
  } else {
    const location = currentLocation.location as Location;
    const coordinates = currentLocation.location?.geo.coordinates;
    const leafCoordinates = toLeaflet(coordinates as Coordinates);
    map = (
      <div style={{ width: '100%' }}>
        <div>{location.name}</div>
        <div>{location.description}</div>
        <MapContainer
          center={leafCoordinates}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={leafCoordinates}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle
            center={leafCoordinates}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={1000}
          />
        </MapContainer>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Map</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {map}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default React.memo(Events);
