import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  eventContainer: {
    minHeight: 200,
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  eventList: {
    width: '100%',
  },
}));

export default useStyles;
