import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  button: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      borderColor: theme.palette.error.light,
    },
  },
}));

export default useStyles;
