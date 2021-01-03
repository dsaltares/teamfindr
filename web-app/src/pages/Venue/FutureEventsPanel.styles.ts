import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  eventsPaper: {
    minHeight: '100%',
  },
  titleContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default useStyles;
