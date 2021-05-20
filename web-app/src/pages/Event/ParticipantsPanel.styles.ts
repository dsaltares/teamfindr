import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '100%',
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
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
