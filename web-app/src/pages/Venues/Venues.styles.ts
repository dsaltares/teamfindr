import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
  },
  filters: {
    padding: theme.spacing(2),
  },
  venues: {
    minHeight: '100%',
  },
}));

export default useStyles;
