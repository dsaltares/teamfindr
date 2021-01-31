import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  image: {
    width: '100%',
    maxWidth: 600,
  },
}));

export default useStyles;
