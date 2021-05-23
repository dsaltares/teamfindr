import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
    borderRadius: 5,
    padding: theme.spacing(2),
  },
  bold: {
    fontWeight: 600,
  },
}));

export default useStyles;
