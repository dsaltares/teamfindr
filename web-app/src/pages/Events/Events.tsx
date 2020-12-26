import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import Skeleton from '@material-ui/lab/Skeleton';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import useCurrentLocation from '../../utils/useCurrentLocation';
import './Events.css';
import useStyles, { AccordionSummary } from './Events.styles';

const Events = () => {
  const { position, error } = useCurrentLocation();
  const loadingPosition = !position && !error;
  const classes = useStyles();

  let map = null;
  if (loadingPosition) {
    map = <Skeleton width="100%" height={310} variant="rect" />;
  } else if (error) {
    map = <div>{error.message}</div>;
  } else {
    map = (
      <div style={{ width: '100%' }}>
        <MapContainer
          center={[position?.latitude as number, position?.longitude as number]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              position?.latitude as number,
              position?.longitude as number,
            ]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle
            center={[
              position?.latitude as number,
              position?.longitude as number,
            ]}
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

export default Events;
