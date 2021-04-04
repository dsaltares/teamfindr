import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '100%',
  },
  titleContainer: {
    padding: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
}));

export default useStyles;
