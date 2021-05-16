import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
  popupIndicator: {
    color: theme.palette.primary.main,
  },
  clearIndicator: {
    color: theme.palette.error.main,
  },
}));

export default useStyles;
