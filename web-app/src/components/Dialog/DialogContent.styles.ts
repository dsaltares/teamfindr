import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
    padding: theme.spacing(2),
  },
}));

export default useStyles;
