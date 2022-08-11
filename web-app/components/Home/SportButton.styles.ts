import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

export default useStyles;
