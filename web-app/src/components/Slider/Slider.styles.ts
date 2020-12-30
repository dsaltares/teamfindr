import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  sliderContainer: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

export default useStyles;
