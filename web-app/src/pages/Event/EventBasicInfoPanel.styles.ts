import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
  },
  info: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  address: {
    flex: 1,
  },
}));

export default useStyles;
