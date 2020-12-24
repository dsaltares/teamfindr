import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tabPanel: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
