import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabPanel: {
    display: 'flex',
    flex: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  tabs: {
    width: '100%',
  },
}));

export default useStyles;
