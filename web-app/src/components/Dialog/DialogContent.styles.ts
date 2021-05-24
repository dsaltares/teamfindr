import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
