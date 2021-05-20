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
    width: 32,
    height: 32,
  },
  large: {
    width: 42,
    height: 42,
  },
  xLarge: {
    width: 128,
    height: 128,
  },
  placeholder: {
    borderWidth: 2,
    borderRadius: '50%',
    borderStyle: 'dashed',
    borderColor: '#C4C4C4',
    boxSizing: 'border-box',
  },
}));

export default useStyles;
