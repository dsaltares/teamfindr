import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  eventContainer: {
    minHeight: 200,
  },
  buttonContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
