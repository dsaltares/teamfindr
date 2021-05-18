import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  avatar: {
    width: 66,
    height: 66,
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
