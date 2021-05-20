import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export default useStyles;
