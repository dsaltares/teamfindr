import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
}));

export default useStyles;
