import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navigation: {
    position: 'fixed',
    bottom: 0,
    top: 'auto',
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
  },
  filler: {
    background: 'none',
  },
}));

export default useStyles;
