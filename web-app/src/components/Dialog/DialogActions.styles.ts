import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      borderColor: theme.palette.error.light,
    },
  },
}));

export default useStyles;
