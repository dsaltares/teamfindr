import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actions: {
    boxShadow: '0px -4px 21px rgba(32, 32, 32, 0.1)',
    borderRadius: '10px 10px 0px 0px',
  },
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export default useStyles;
