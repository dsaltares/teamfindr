import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    height: '100%',
  },
  icon: {
    minWidth: 0,
    paddingRight: theme.spacing(1),
  },
}));

export default useStyles;
