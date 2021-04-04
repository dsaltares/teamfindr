import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1),
  },
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
  canceled: {
    textDecoration: 'line-through',
    color: theme.palette.error.main,
  },
}));

export default useStyles;
