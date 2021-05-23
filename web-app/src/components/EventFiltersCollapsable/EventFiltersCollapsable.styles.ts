import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
  },
  header: {
    padding: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(2),
  },
  iconContainer: {
    display: 'flex',
  },
  bold: {
    fontWeight: 600,
  },
}));

export default useStyles;
