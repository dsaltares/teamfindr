import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
  },
  content: {
    padding: theme.spacing(1),
  },
  iconContainer: {
    display: 'flex',
  },
}));

export default useStyles;
