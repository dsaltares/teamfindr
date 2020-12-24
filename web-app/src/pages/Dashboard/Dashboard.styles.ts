import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    maxWidth: '900px',
  },
}));

export default useStyles;
