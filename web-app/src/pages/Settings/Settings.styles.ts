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
  tabLabelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tabIcon: {
    paddingRight: theme.spacing(1),
  },
}));

export default useStyles;
