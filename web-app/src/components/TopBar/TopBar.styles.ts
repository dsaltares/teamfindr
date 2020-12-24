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
    paddingRight: theme.spacing(2),
  },
  list: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  listItem: {
    height: '100%',
  },
}));

export default useStyles;
