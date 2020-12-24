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
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: 0,
  },
}));

export default useStyles;
