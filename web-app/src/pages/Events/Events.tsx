import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import Map from '../../components/Map';
import useStyles, { AccordionSummary } from './Events.styles';
import { useCurrentLocation } from '../../hooks';

const Events = () => {
  const currentLocation = useCurrentLocation();
  const classes = useStyles();

  return (
    <Page title="Events">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Map</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Map location={currentLocation.location} />
        </AccordionDetails>
      </Accordion>
    </Page>
  );
};

export default React.memo(Events);
