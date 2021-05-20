import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
  },
  venueImage: {
    width: '100%',
    height: 125,
    objectFit: 'cover',
    borderRadius: 6,
  },
}));

export default useStyles;
