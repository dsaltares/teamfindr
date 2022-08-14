import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  venueImage: {
    width: '100%',
    height: 125,
    objectFit: 'cover',
    borderRadius: 6,
  },
}));

export default useStyles;
