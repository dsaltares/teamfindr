import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: theme.spacing(2),
  },
  mobileTitleContainer: {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 0px 8px rgba(32, 32, 32, 0.15)',
    borderRadius: '0px 0px 10px 10px',
  },
  button: {
    padding: 6,
  },
  dangerButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      borderColor: theme.palette.error.light,
    },
  },
  bold: {
    fontWeight: 600,
  },
}));

export default useStyles;
