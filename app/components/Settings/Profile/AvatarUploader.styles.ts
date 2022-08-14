import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    display: 'none',
  },
  iconContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
}));

export default useStyles;
