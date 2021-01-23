import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'space-between',
    flex: 1,
    width: '100%',
  },
  button: {
    padding: '2px',
  },
}));

export default useStyles;
