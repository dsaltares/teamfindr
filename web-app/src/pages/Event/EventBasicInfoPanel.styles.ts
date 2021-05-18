import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
  },
  imgContainer: {
    position: 'relative',
  },
  tabContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  venueImage: {
    width: '100%',
    height: 125,
    objectFit: 'cover',
    borderRadius: 6,
    marginBottom: theme.spacing(2),
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  address: {
    flex: 1,
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
}));

export default useStyles;
