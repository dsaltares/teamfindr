import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filtersPaper: {
    padding: theme.spacing(2),
  },
  eventsPaper: {
    minHeight: '100%',
    display: 'flex',
  },
  eventSkeleton: {
    minHeight: 200,
  },
}));

export default useStyles;
