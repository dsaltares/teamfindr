import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

export const AccordionSummary = withStyles({
  root: {
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles(() => ({
  accordionDetails: {
    padding: 0,
  },
}));

export default useStyles;
