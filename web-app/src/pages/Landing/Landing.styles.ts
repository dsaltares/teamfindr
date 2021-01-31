import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  buttonContainer: {
    marginTop: theme.spacing(3),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

export default useStyles;
