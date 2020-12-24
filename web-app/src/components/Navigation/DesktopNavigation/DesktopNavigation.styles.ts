import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topBar: {
    minHeight: 'auto',
    height: 64,
  },
  fullHeight: {
    height: '100%',
  },
  titleContainer: {
    paddingRight: theme.spacing(6),
  },
  list: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  item: {
    height: '100%',
  },
  icon: {
    minWidth: 0,
    paddingRight: theme.spacing(1),
  },
}));

export default useStyles;
