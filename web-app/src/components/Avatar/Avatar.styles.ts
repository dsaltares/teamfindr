import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  xSmall: {
    width: 20,
    height: 20,
  },
  small: {
    width: 24,
    height: 24,
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default useStyles;
