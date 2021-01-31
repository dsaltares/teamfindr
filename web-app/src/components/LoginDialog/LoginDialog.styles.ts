import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  buttonsContainer: {
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  policyButton: {
    width: '100%',
    maxWidth: 300,
    textAlign: 'left',
  },
}));

export default useStyles;
