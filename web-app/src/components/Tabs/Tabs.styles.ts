import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    paddingTop: theme.spacing(2),
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
