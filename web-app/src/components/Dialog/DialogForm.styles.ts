import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    overflowY: 'auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
}));

export default useStyles;
