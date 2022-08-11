import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '100%',
    padding: theme.spacing(2),
  },
  bold: {
    fontWeight: 600,
  },
  fullWidth: {
    width: '100%',
  },
}));

export default useStyles;
