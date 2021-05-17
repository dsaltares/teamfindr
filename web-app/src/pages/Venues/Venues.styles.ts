import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filtersPaper: {
    padding: theme.spacing(2),
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
  },
  venuesPaper: {
    minHeight: '100%',
  },
}));

export default useStyles;
