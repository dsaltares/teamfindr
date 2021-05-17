import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actions: {
    boxShadow: '0px -4px 21px rgba(32, 32, 32, 0.1)',
    borderRadius: '10px 10px 0px 0px',
  },
  dangerButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      borderColor: theme.palette.error.light,
    },
  },
}));

export default useStyles;
